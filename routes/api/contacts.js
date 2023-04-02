const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { validation } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validation(contactSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validation(contactSchema), ctrl.updateContactById);

module.exports = router;
