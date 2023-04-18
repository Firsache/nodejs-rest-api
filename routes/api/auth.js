const express = require("express");
const router = express.Router();

const { auth: ctrl } = require("../../controllers");
const { validation, ctrWrapper, auth, upload } = require("../../middlewares");
const {
  joiRegisterSchema,
  joiLoginSchema,
  subscriptionJoiSchema,
  verificationJoiSchema,
} = require("../../models/user");

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrWrapper(ctrl.register)
);

router.post("/login", validation(joiLoginSchema), ctrWrapper(ctrl.login));

router.get("/verify/:verificationToken", ctrWrapper(ctrl.verifyEmail));
router.post(
  "/verify",
  validation(verificationJoiSchema),
  ctrWrapper(ctrl.updateVerification)
);

router.get("/current", auth, ctrWrapper(ctrl.getCurrent));

router.post("/logout", auth, ctrWrapper(ctrl.logout));

router.patch(
  "/",
  auth,
  validation(subscriptionJoiSchema),
  ctrWrapper(ctrl.updateSubscriptionUser)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrWrapper(ctrl.updateAvatar)
);

module.exports = router;
