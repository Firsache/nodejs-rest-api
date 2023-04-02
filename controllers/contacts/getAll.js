const contactsOperations = require("../../db");
const getAll = async (_, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();

    res.json({
      status: 200,
      message: "success",
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
