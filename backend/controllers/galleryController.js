import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const galleryFile = path.join(__dirname, "../gallery.json");

async function readGallery() {
  try {
    const data = await readFile(galleryFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeGallery(data) {
  await writeFile(galleryFile, JSON.stringify(data, null, 2));
}

export const getGallery = async (req, res) => {
  const images = await readGallery();
  res.json(images);
};

export const uploadImage = async (req, res) => {
  try {
    const images = await readGallery();
    const newImg = {
      id: Date.now(),
      filename: req.file.filename,
    };
    images.push(newImg);
    await writeGallery(images);
    res.status(201).json(newImg);
  } catch (err) {
    res.status(500).json({ message: "Error saving image" });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const images = await readGallery();
    const updated = images.filter((img) => img.id != req.params.id);
    await writeGallery(updated);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting image" });
  }
};
