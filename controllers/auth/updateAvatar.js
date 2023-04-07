const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const publicAvatarDir = path.resolve("public");

const getAvatar = async (req, res) => {
  const { _id } = req.user;
  const avatarURL = path.join("avatars", `${_id}_${req.file.originalname}`);
  const resultUpload = path.join(publicAvatarDir, avatarURL);

  const img = await Jimp.read(req.file.path);
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(req.file.path);

  try {
    await fs.rename(req.file.path, resultUpload);
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }

  const user = await User.findByIdAndUpdate(_id, {
    avatarURL,
  });

  if (!user) {
    throw new Unauthorized("Not authorized");
  }

  res.json({
    status: 200,
    message: "Success",
    data: {
      avatarURL,
    },
  });
};

module.exports = getAvatar;
