const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { validation, ctrWrapper, auth } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

router.get("/", auth, ctrWrapper(ctrl.getAll));

router.get("/:contactId", ctrWrapper(ctrl.getContactById));

router.post("/", auth, validation(joiSchema), ctrWrapper(ctrl.addContact));

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
