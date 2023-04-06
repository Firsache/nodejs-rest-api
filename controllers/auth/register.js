const { User } = require("../../models");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({ email, password: hashPassword });

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
