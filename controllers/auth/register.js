const { User } = require("../../models");
const createError = require("http-errors");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  await User.create({ email, password });

  res.json({
    status: 201,
    message: "Created",
    data: {
      user: {
        email,
        subscription: "starter",
      },
    },
  });
};

module.exports = register;
