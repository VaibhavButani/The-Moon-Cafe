import express from "express";
import fs from "fs";
import path from "path";
import { verifyToken } from "./auth.js";

const router = express.Router();
const CONTACT_FILE = path.join(process.cwd(), "backend/contacts.json");

function readContacts() {
  if (!fs.existsSync(CONTACT_FILE)) return [];
  return JSON.parse(fs.readFileSync(CONTACT_FILE, "utf-8"));
}
function saveContacts(data) {
  fs.writeFileSync(CONTACT_FILE, JSON.stringify(data, null, 2));
}

// Public: save contact
router.post("/contact", (req, res) => {
  const newMsg = { id: Date.now().toString(), ...req.body };
  const data = readContacts();
  data.push(newMsg);
  saveContacts(data);
  res.json({ success: true, message: "Contact saved ✅", data: newMsg });
});

// Admin: get all
router.get("/contact", verifyToken, (req, res) => {
  const data = readContacts();
  res.json(data);
});

// Admin: delete
router.delete("/contact/:id", verifyToken, (req, res) => {
  const data = readContacts();
  const updated = data.filter((c) => c.id !== req.params.id);
  if (updated.length === data.length) {
    return res.status(404).json({ message: "Message not found" });
  }
  saveContacts(updated);
  res.json({ success: true, message: "Message deleted successfully" });
});

export default router;
