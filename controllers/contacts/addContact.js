const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const response = await Contact.create(req.body);

  res.json({
    status: 201,
    message: "created a contact",
    data: {
      result: response,
    },
  });
};

module.exports = addContact;
