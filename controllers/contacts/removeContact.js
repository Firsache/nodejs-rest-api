const { Contact } = require("../../models");
const createError = require("http-errors");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndRemove(contactId);

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
