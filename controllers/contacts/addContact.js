const contactsOperations = require("../../db");
const contactSchema = require("../../routes/api/contacts");

const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

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
