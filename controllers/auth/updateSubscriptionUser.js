const { User } = require("../../models");
const createError = require("http-errors");

const updateSubscriptionUser = async (req, res) => {
  if (!req.body) {
    throw createError(400, "missing field favorite");
  }

  const { _id } = req.user;
  const { subscription } = req.body;
  const data = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!data) {
    throw createError(404, "Not found");
  }

  res.json({
    status: 200,
    message: "success",
    data: {
      result: data,
    },
  });
};

module.exports = updateSubscriptionUser;
