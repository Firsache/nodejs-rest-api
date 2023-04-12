const { User } = require("../../models");
const { NotFound } = require("http-errors");
const createError = require("http-errors");

const updateVerification = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound();
  }
  if (user.verificationToken === null) {
    throw createError(400, "Verification has already been passed");
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  res.json({
    status: 200,
    message: "Verification successful",
  });
};
module.exports = updateVerification;
