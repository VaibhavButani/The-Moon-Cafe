import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const router = express.Router();
const DB_FILE = path.join(process.cwd(), "backend/admin.json");
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

// Helpers
function readAdmin() {
  if (!fs.existsSync(DB_FILE)) return null;
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}
function saveAdmin(admin) {
  fs.writeFileSync(DB_FILE, JSON.stringify(admin, null, 2));
}

// Middleware: verify JWT
function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  if (token.startsWith("Bearer ")) token = token.slice(7).trim();

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.user = decoded;
    next();
  });
}

// Create default admin (one-time setup)
router.get("/create-admin", async (req, res) => {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = { username: "admin", password: hashedPassword };
  saveAdmin(admin);
  res.send("✅ Admin created! Username: admin, Password: admin123");
});

// Login
router.post("/login", async (req, res) => {
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

// Protected test
router.get("/admin", verifyToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username} to Admin Dashboard!` });
});

// Change password
router.post("/change-password", verifyToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const admin = readAdmin();

  const isMatch = await bcrypt.compare(oldPassword, admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Old password is incorrect" });
  }
  if (oldPassword === newPassword) {
    return res.status(400).json({ message: "New password must be different" });
  }

  const hashedNew = await bcrypt.hash(newPassword, 10);
  admin.password = hashedNew;
  saveAdmin(admin);

  res.json({ message: "Password updated successfully" });
});

export default router;
export { verifyToken };
