const express = require("express");

const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
} = require("../../db");

router.get("/", async (_, res) => {
  const contacts = await listContacts();

  res.json({
    status: 200,
    message: "success",
    data: {
      result: contacts,
    },
  });
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);

  if (!data) {
    res.json({
      status: 404,
      message: "Not found",
    });
  }
  res.json({
    status: 200,
    message: "success",
    data: {
      result: data,
    },
  });
});

router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.json({
      status: 400,
      message: "missing required name field",
    });
    return;
  }

  const response = await addContact(name, email, phone);
  res.json({
    status: 201,
    message: "created a contact",
    data: {
      result: response,
    },
  });
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);
  if (!data) {
    res.json({
      status: 404,
      message: "Not found",
    });
  }
  res.json({
    status: 200,
    message: "contact deleted",
    data: {
      result: data,
    },
  });
});

router.put("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  if (!body) {
    res.json({
      status: 400,
      message: "missing field",
    });
    return;
  }

  const response = await updateContactById(contactId, body);
  if (!response) {
    res.json({
      status: 404,
      message: "Not found",
    });
  }
  res.json({
    status: 201,
    message: "updated the contact",
    data: {
      result: response,
    },
  });
});

module.exports = router;
