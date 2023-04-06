const { User } = require("../../models");
const { Unauthorized } = require("http-errors");

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { token: null });

  if (!user) {
    throw new Unauthorized("Not authorized");
  }

  res.json({
    status: 204,
    message: "No content",
  });
};

module.exports = logout;
