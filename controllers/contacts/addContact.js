const contactsOperations = require("../../db");

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const response = await contactsOperations.addContact(name, email, phone);
  res.json({
    status: 201,
    message: "created a contact",
    data: {
      result: response,
    },
  });
};

module.exports = addContact;
