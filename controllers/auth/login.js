const { User } = require("../../models");
const createError = require("http-errors");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  await User.create({ email, password });

  res.json({
    status: 200,
    message: "Success",
    data: {
      token: "exampletoken",
      user: {
        email,
        subscription: "starter",
      },
    },
  });
};

module.exports = login;
