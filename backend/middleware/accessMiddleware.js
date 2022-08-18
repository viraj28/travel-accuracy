const { roles } = require('../roles');
const asyncHandler = require('express-async-handler');

const grantAccess = function (action, resource) {
  return asyncHandler(async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        res.status(401);
        throw new Error(
          "You don't have enough permission to perform this action"
        );
      }
      next();
    } catch (err) {
      next(err);
    }
  });
};

module.exports = {
  grantAccess,
};
