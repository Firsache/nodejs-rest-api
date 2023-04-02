const express = require("express");
const Joi = require("joi");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  phone: Joi.number().min(9).required(),
});

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getContactById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", ctrl.updateContactById);

module.exports = router;
module.exports = contactSchema;
