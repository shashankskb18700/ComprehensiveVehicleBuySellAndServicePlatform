const { getUser } = require("../services/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;

  req.user = null;

  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;

  next();
}

function approveTo(role = []) {
  return function (req, res, next) {
    if (!req.user)
      return res.json({ msg: "you should i login to access this page" });

    if (!role.includes(req.user.role)) return res.json({ msg: "unauthorised" });

    return next();
  };
}

module.exports = {
  checkForAuthentication,
  approveTo,
};
