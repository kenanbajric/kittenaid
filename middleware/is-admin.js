const User = require("../models/user.js");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const isAdmin = user.isAdmin;
    if (!isAdmin) {
      const error = new Error("Not authorized.");
      error.statusCode = 401;
      next(error);
    } else {
      next();
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};
