const contactsOperations = require("../../db");

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const response = await contactsOperations.addContact(name, email, phone);
    res.json({
      status: 201,
      message: "created a contact",
      data: {
        result: response,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
