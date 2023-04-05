const getCurrent = async (req, res) => {
  res.json({
    status: 200,
    message: "Success",
    data: {
      user: {
        email: req.user.email,
        subscription: "starter",
      },
    },
  });
};

module.exports = getCurrent;
