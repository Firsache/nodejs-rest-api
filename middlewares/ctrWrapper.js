const ctrWrapper = (ctr) => {
  return async (req, res, next) => {
    try {
      await ctr(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = ctrWrapper;
