const contactsOperations = require("../../db");
const createError = require("http-errors");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await contactsOperations.getContactById(contactId);

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
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
