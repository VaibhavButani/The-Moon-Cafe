// routes/contactRoutes.js
import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const contactsFile = path.join(process.cwd(), "contacts.json");

// GET all contacts
router.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(contactsFile));
  res.json(data);
});

// DELETE contact by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let data = JSON.parse(fs.readFileSync(contactsFile));

  const newData = data.filter((c) => c._id !== id); // must match frontend key
  if (data.length === newData.length) {
    return res.status(404).json({ message: "Contact not found" });
  }

  fs.writeFileSync(contactsFile, JSON.stringify(newData, null, 2));
  res.json({ message: "Deleted successfully" });
});

export default router;
