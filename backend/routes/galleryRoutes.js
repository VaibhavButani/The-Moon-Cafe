import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { getGallery, uploadImage, deleteImage } from "../controllers/galleryController.js";

const router = express.Router();

// Setup multer storage
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads/gallery"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Routes
router.get("/", getGallery);
router.post("/", upload.single("image"), uploadImage);
router.delete("/:id", deleteImage);

export default router;
