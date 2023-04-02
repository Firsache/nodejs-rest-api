const createError = require("http-errors");

const contactsOperations = require("../../db");

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const response = await contactsOperations.updateContactById(
      contactId,
      req.body
    );
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
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactById;
