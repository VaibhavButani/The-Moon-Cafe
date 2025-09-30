import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";

const router = express.Router();
const GALLERY_FILE = path.join(process.cwd(), "backend/gallery.json");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(process.cwd(), "backend/uploads/gallery");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only images allowed!"), false);
  },
});

function readGallery() {
  if (!fs.existsSync(GALLERY_FILE)) return [];
  return JSON.parse(fs.readFileSync(GALLERY_FILE, "utf-8"));
}
function saveGallery(data) {
  fs.writeFileSync(GALLERY_FILE, JSON.stringify(data, null, 2));
}

// Get gallery
router.get("/gallery", (req, res) => {
  res.json(readGallery());
});

// Upload images
router.post("/gallery", upload.array("images", 20), (req, res) => {
  const images = readGallery();
  const newImgs = req.files.map((file) => ({
    id: Date.now() + Math.random(),
    filename: file.filename,
  }));
  images.push(...newImgs);
  saveGallery(images);
  res.status(201).json(newImgs);
});

// Delete image
router.delete("/gallery/:filename", (req, res) => {
  const images = readGallery();
  const index = images.findIndex((img) => img.filename === req.params.filename);
  if (index === -1) {
    return res.status(404).json({ message: "Image not found" });
  }

  const imgPath = path.join(
    process.cwd(),
    "backend/uploads/gallery",
    images[index].filename
  );
  if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);

  images.splice(index, 1);
  saveGallery(images);

  res.json({ success: true, message: "Image deleted successfully" });
});

export default router;
