const { readFile, writeFile } = require("fs/promises");
const { v4 } = require("uuid");

const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

async function updateContacts(contacts) {
  await writeFile(contactsPath, JSON.stringify(contacts));
}

async function listContacts() {
  try {
    const response = await readFile(contactsPath);
    const contactsArr = JSON.parse(response);
    return contactsArr;
  } catch (err) {
    console.error(err.message);
  }
}

async function getContactById(contactId) {
  const contactsArr = await listContacts();
  const contactInfo = contactsArr.filter((elem) => elem.id === contactId);
  if (!contactInfo) {
    return null;
  }
  return contactInfo;
}

async function removeContact(contactId) {
  const contactsArr = await listContacts();
  const idx = contactsArr.findIndex((elem) => elem.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContactsArr = contactsArr.filter((_, index) => index !== idx);
  updateContacts(newContactsArr);
  return contactsArr[idx];
}

async function addContact(name, email, phone) {
  const contactsArr = await listContacts();
  const newContact = { id: v4(), name, email, phone };

  const newContactsArr = [...contactsArr, newContact];

  updateContacts(newContactsArr);
  return newContact;
}

async function updateContactById(contactId, body) {
  const contactsArr = await listContacts();
  const idx = contactsArr.findIndex((elem) => elem.id === contactId);
  if (idx === -1) {
    return null;
  }

  contactsArr[idx] = { ...contactsArr[idx], ...body };

  updateContacts(contactsArr);
  return contactsArr[idx];
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
