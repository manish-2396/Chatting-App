const jwt = require("jsonwebtoken");

const middleware = (req, res, next) => {
  console.log(req.headers?.authorization);
  if (!req.headers.authorization) {
    return res.status(404).send({ Massage: "Something went wrong." });
  } else {
    const token = req.headers.authorization;
    console.log("token:", token);
    jwt.verify(token, process.env.Code, function (err, decoded) {
      if (err) {
        return res.status(404).send({ Massage: "Something went wrong." });
      } else {
        req.body.user_id = decoded.userId;
        next();
      }
    });
  }
};

module.exports = { middleware };
