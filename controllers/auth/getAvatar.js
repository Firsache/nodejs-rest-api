// const { User } = require("../../models");
// const { Unauthorized } = require("http-errors");

const getAvatar = async (req, res) => {
  console.log(req.file);
  //   const { _id } = req.user;
  //   const user = await User.findByIdAndUpdate(_id, { avatarURL: req.file });

  res.json({
    status: 200,
    message: "Success",
    // data: {
    //   avatarURL: req.file,
    // },
  });
};

module.exports = getAvatar;
