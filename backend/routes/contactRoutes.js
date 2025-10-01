import express from "express";
import fs from "fs";
import path from "path";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Always use the same file for contacts
const CONTACT_FILE = path.join(process.cwd(), "backend/contacts.json");

// ===== Helpers =====
function readContacts() {
  try {
    if (!fs.existsSync(CONTACT_FILE)) return [];
    const raw = fs.readFileSync(CONTACT_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading contacts:", err);
    return [];
  }
}

function saveContacts(data) {
  try {
    fs.writeFileSync(CONTACT_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error saving contacts:", err);
  }
}

// ===== Routes =====

// ✅ Public: Save contact message
router.post("/contact", (req, res) => {
  try {
    const newContact = {
      id: Date.now().toString(),
      ...req.body,
    };

    const data = readContacts();
    data.push(newContact);
    saveContacts(data);

    res.status(201).json({
      success: true,
      message: "Contact saved ✅",
      data: newContact,
    });
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Admin: Get all messages
router.get("/contact", verifyToken, (req, res) => {
  try {
    const data = readContacts();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Admin: Delete a message
router.delete("/contact/:id", verifyToken, (req, res) => {
  try {
    const data = readContacts();
    const updated = data.filter((c) => c.id !== req.params.id);

    if (updated.length === data.length) {
      return res.status(404).json({ message: "Message not found" });
    }

    saveContacts(updated);
    res.json({ success: true, message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
