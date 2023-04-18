const { User } = require("../../models");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "Email in use");
  }

  const verificationToken = v4();
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Підтвердження email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Натисність на посилання для підтвердження email</a>`,
  };

  await sendEmail(mail);
  res.json({
    status: 201,
    message: "Created",
    data: {
      user: {
        email,
        subscription: "starter",
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = register;
