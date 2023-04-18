const { User } = require("../../models");
const { NotFound } = require("http-errors");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new NotFound();
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

module.exports = verifyEmail;
