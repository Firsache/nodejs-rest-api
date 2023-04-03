const { Contact } = require("../../models");
const createError = require("http-errors");

const updateStatusContact = async (req, res) => {
  if (!req.body) {
    throw createError(400, "missing field favorite");
  }

  const { contactId } = req.params;
  const { favorite } = req.body;
  const data = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
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

module.exports = updateStatusContact;
