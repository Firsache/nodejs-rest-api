const { Contact } = require("../../models");
const createError = require("http-errors");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);

  if (!data) {
    throw createError(404, "Not found");
  }

  res.json({
    status: 200,
    message: "success",
    data: {
      result: data,
    },
  });
};

module.exports = getContactById;
