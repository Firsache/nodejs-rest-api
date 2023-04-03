const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { validation, ctrWrapper } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

router.get("/", ctrWrapper(ctrl.getAll));

router.get("/:contactId", ctrWrapper(ctrl.getContactById));

router.post("/", validation(joiSchema), ctrWrapper(ctrl.addContact));

router.delete("/:contactId", ctrWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validation(joiSchema),
  ctrWrapper(ctrl.updateContactById)
);

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrWrapper(ctrl.updateStatusContact)
);

module.exports = router;
