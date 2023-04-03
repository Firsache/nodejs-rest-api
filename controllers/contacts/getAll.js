const contactsOperations = require("../../db");

const getAll = async (_, res) => {
  const contacts = await contactsOperations.listContacts();

  res.json({
    status: 200,
    message: "success",
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
