const { Contact } = require("../../models");

const getAll = async (_, res) => {
  const contacts = await Contact.find({});

  res.json({
    status: 200,
    message: "success",
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
