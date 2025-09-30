import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactFile = path.join(__dirname, "../contacts.json");

// ===== Helpers =====
async function readContacts() {
  try {
    const data = await readFile(contactFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeContacts(data) {
  await writeFile(contactFile, JSON.stringify(data, null, 2));
}

// ===== Controllers =====
export const getContacts = async (req, res) => {
  const contacts = await readContacts();
  res.json(contacts);
};

export const addContact = async (req, res) => {
  try {
    const contacts = await readContacts();
    const newContact = {
      id: Date.now().toString(),
      ...req.body,
    };
    contacts.push(newContact);
    await writeContacts(contacts);
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ message: "Error saving contact" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contacts = await readContacts();
    const updated = contacts.filter((c) => c.id !== req.params.id);

    if (updated.length === contacts.length) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await writeContacts(updated);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting contact" });
  }
};
