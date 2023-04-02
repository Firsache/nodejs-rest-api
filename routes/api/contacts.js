const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { validation, ctrWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

router.get("/", ctrWrapper(ctrl.getAll));

router.get("/:contactId", ctrWrapper(ctrl.getContactById));

router.post("/", validation(contactSchema), ctrWrapper(ctrl.addContact));

router.delete("/:contactId", ctrWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validation(contactSchema),
  ctrWrapper(ctrl.updateContactById)
);

module.exports = router;
