const express = require("express");

const router = express.Router();
const path = require("path");
const { listContacts, getContactById } = path.resolve("../../db");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();

  res.json({
    status: 200,
    message: "success",
    data: {
      result: contacts,
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.id;
  const response = await getContactById(id);

  if (!response) {
    res.json({
      status: 404,
      message: "Not found",
    });
  }
  res.json({
    status: 200,
    message: "success",
    data: {
      result: response,
    },
  });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
