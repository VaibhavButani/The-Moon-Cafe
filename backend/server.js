import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const DB_FILE = "./admin.json";
const CONTACT_FILE = "./contacts.json";
const GALLERY_FILE = "./gallery.json";
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

// ========== ADMIN HELPERS ==========
function readAdmin() {
  if (!fs.existsSync(DB_FILE)) return null;
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}
function saveAdmin(admin) {
  fs.writeFileSync(DB_FILE, JSON.stringify(admin, null, 2));
}

// ========== MIDDLEWARE ==========
function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  if (token.startsWith("Bearer ")) {
    token = token.slice(7).trim();
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.user = decoded;
    next();
  });
}

// ========== AUTH ==========
app.get("/create-admin", async (req, res) => {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = { username: "admin", password: hashedPassword };
  saveAdmin(admin);
  res.send("✅ Admin created! Username: admin, Password: admin123");
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = readAdmin();
  if (!admin) return res.status(400).json({ message: "Admin not found" });

  if (username !== admin.username)
    return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ username: admin.username }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

app.get("/api/admin", verifyToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username} to Admin Dashboard!` });
});

app.post("/api/change-password", verifyToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const admin = readAdmin();

  const isMatch = await bcrypt.compare(oldPassword, admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Old password is incorrect" });
  }

  if (oldPassword === newPassword) {
    return res
      .status(400)
      .json({ message: "New password must be different from old password" });
  }

  const hashedNew = await bcrypt.hash(newPassword, 10);
  admin.password = hashedNew;
  saveAdmin(admin);

  res.json({ message: "Password updated successfully" });
});

// ========== CONTACT ==========
app.post("/api/contact", (req, res) => {
  const newMsg = { id: Date.now(), ...req.body };

  let data = [];
  if (fs.existsSync(CONTACT_FILE)) {
    data = JSON.parse(fs.readFileSync(CONTACT_FILE, "utf8"));
  }
  data.push(newMsg);

  fs.writeFileSync(CONTACT_FILE, JSON.stringify(data, null, 2));
  res.json({ success: true, message: "Contact saved ✅", data: newMsg });
});

app.get("/api/contact", verifyToken, (req, res) => {
  if (!fs.existsSync(CONTACT_FILE)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(CONTACT_FILE, "utf8"));
  res.json(data);
});

app.delete("/api/contact/:id", verifyToken, (req, res) => {
  if (!fs.existsSync(CONTACT_FILE)) {
    return res.status(404).json({ message: "No contacts found" });
  }

  let data = JSON.parse(fs.readFileSync(CONTACT_FILE, "utf8"));
  const id = parseInt(req.params.id, 10);

  const index = data.findIndex((msg) => msg.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Message not found" });
  }

  data.splice(index, 1);
  fs.writeFileSync(CONTACT_FILE, JSON.stringify(data, null, 2));

  res.json({ success: true, message: "Message deleted successfully" });
});

// ========== GALLERY ==========
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("uploads/gallery")) {
      fs.mkdirSync("uploads/gallery", { recursive: true });
    }
    cb(null, "uploads/gallery");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed!"), false);
    }
  },
});

app.get("/api/gallery", (req, res) => {
  if (!fs.existsSync(GALLERY_FILE)) return res.json([]);
  const images = JSON.parse(fs.readFileSync(GALLERY_FILE, "utf8"));
  res.json(images);
});

app.post("/api/gallery", upload.array("images", 20), (req, res) => {
  let images = [];
  if (fs.existsSync(GALLERY_FILE)) {
    images = JSON.parse(fs.readFileSync(GALLERY_FILE, "utf8"));
  }

  const newImgs = req.files.map((file) => ({
    id: Date.now() + Math.random(),
    filename: file.filename,
  }));

  images.push(...newImgs);
  fs.writeFileSync(GALLERY_FILE, JSON.stringify(images, null, 2));

  res.status(201).json(newImgs);
});

app.delete("/api/gallery/:filename", (req, res) => {
  if (!fs.existsSync(GALLERY_FILE)) {
    return res.status(404).json({ message: "No gallery found" });
  }

  let images = JSON.parse(fs.readFileSync(GALLERY_FILE, "utf8"));
  const filename = req.params.filename;

  const index = images.findIndex((img) => img.filename === filename);
  if (index === -1) {
    return res.status(404).json({ message: "Image not found" });
  }

  const imgPath = path.join("uploads/gallery", images[index].filename);
  if (fs.existsSync(imgPath)) {
    fs.unlinkSync(imgPath);
  }

  images.splice(index, 1);
  fs.writeFileSync(GALLERY_FILE, JSON.stringify(images, null, 2));

  res.json({ success: true, message: "Image deleted successfully" });
});

// ========== START ==========
// const PORT = 5000;
// app.listen(PORT, () =>
//   console.log(`🚀 Backend running on http://localhost:${PORT}`)
// );
app.listen(5000, "0.0.0.0", () => {
  console.log("✅ Server running on http://0.0.0.0:5000");
});


