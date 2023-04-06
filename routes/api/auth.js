const express = require("express");
const router = express.Router();

const { auth: ctrl } = require("../../controllers");
const { validation, ctrWrapper, auth } = require("../../middlewares");
const {
  joiRegisterSchema,
  joiLoginSchema,
  subscriptionJoiSchema,
} = require("../../models/user");

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrWrapper(ctrl.register)
);

router.post("/login", validation(joiLoginSchema), ctrWrapper(ctrl.login));

router.get("/current", auth, ctrWrapper(ctrl.getCurrent));

router.post("/logout", auth, ctrWrapper(ctrl.logout));

router.patch(
  "/",
  auth,
  validation(subscriptionJoiSchema),
  ctrWrapper(ctrl.updateSubscriptionUser)
);

module.exports = router;
