const { Contact } = require("../../models");
const createError = require("http-errors");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const response = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!response) {
    throw createError(404, "Not found");
  }
  res.json({
    status: 201,
    message: "updated the contact",
    data: {
      result: response,
    },
  });
};

module.exports = updateContactById;
