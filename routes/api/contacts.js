const express = require("express");
const createError = require("http-errors");
const Joi = require("joi");

const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
} = require("../../db");

const contactAddSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  phone: Joi.number().min(9).required(),
});
// const contactUpdateSchema = Joi.object({
//   name: Joi.string().alphanum().min(3).max(30),
//   email: Joi.string().email({
//     minDomainSegments: 2,
//     tlds: { allow: ["com", "net", "ua"] },
//   }),
//   phone: Joi.number().min(9),
// });

router.get("/", async (_, res, next) => {
  try {
    const contacts = await listContacts();

    res.json({
      status: 200,
      message: "success",
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await getContactById(contactId);

    if (!data) {
      throw createError(404, "Not found");
    }

    res.json({
      status: 200,
      message: "success",
      data: {
        result: data,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { name, email, phone } = req.body;
    // if (!name || !email || !phone) {
    //   throw createError(400, "Missing required name field");
    // }

    const response = await addContact(name, email, phone);
    res.json({
      status: 201,
      message: "created a contact",
      data: {
        result: response,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await removeContact(contactId);
    if (!data) {
      throw createError(404, "Not found");
    }
    res.json({
      status: 200,
      message: "contact deleted",
      data: {
        result: data,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;

    if (!body) {
      throw createError(400, "missing field");
    }

    const response = await updateContactById(contactId, body);
    if (!response) {
      throw createError(404, "Not found");
    }
    res.json({
      status: 201,
      message: "updated the contact",
      data: {
        result: response,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
