const jwt = require("../utils/jwt");

function asureAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ msg: "The request does not have the authentication header" });
  }

  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    const payload = jwt.decoded(token);

    const { exp } = payload;
    const currentData = new Date().getTime();

    if (exp <= currentData) {
      return res.status(400).send({ msg: "The token has expired" });
    }

    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).send({ msg: "Invalid Token" });
  }
}

module.exports = {
  asureAuth,
};