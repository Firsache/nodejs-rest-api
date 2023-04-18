const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscriptionUser = require("./updateSubscriptionUser");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const updateVerification = require("./updateVerification");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscriptionUser,
  updateAvatar,
  verifyEmail,
  updateVerification,
};
