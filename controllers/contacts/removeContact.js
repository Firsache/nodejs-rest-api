const createError = require("http-errors");
const contactsOperations = require("../../db");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactsOperations.removeContact(contactId);
  if (!data) {
    throw createError(404, "Not found");
  }
  res.json({
    status: 200,
    message: "contact deleted",
    data: {
      result: data,
    },
  });
};
module.exports = removeContact;
