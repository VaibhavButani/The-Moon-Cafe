import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const contactsFile = path.join(process.cwd(), "contacts.json");

// Read contacts.json safely
const readContacts = () => {
  if (!fs.existsSync(contactsFile)) return [];
  const data = fs.readFileSync(contactsFile, "utf-8");
  return JSON.parse(data || "[]");
};

// Write contacts.json
const writeContacts = (contacts) => {
  fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
};

// GET all contacts
router.get("/contact", (req, res) => {
  const contacts = readContacts();
  res.json(contacts);
});

// POST new contact
router.post("/contact", (req, res) => {
  const contacts = readContacts();
  const newContact = {
    id: Date.now().toString(), // simple unique id
    ...req.body,
  };
  contacts.push(newContact);
  writeContacts(contacts);
  res.status(201).json(newContact);
});

// DELETE contact
router.delete("/contact/:id", (req, res) => {
  let contacts = readContacts();
  const newContacts = contacts.filter((c) => c.id !== req.params.id);

  if (contacts.length === newContacts.length) {
    return res.status(404).json({ error: "Contact not found" });
  }

  writeContacts(newContacts);
  res.json({ success: true });
});

export default router;
