const express = require("express");
const router = express.Router();

const { auth: ctrl } = require("../../controllers");
const { validation, ctrWrapper } = require("../../middlewares");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrWrapper(ctrl.register)
);

router.post("/login", validation(joiLoginSchema), ctrWrapper(ctrl.login));

// router.get("/:contactId", ctrWrapper(ctrl.getContactById));

// router.post("/", validation(joiRegisterSchema), ctrWrapper(ctrl.addContact));

// router.delete("/:contactId", ctrWrapper(ctrl.removeContact));

// router.put(
//   "/:contactId",
//   validation(joiLoginSchema),
//   ctrWrapper(ctrl.updateContactById)
// );

// router.patch(
//   "/:contactId/favorite",
//   validation(favoriteJoiSchema),
//   ctrWrapper(ctrl.updateStatusContact)
// );

module.exports = router;
