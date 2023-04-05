const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  let contacts = null;

  if (favorite === "true") {
    contacts = await Contact.find({ owner: req.user._id, favorite: true }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email");
  } else {
    contacts = await Contact.find({ owner: req.user._id }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email");
  }

  res.json({
    status: 200,
    message: "success",
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
