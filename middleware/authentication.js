const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.SECRET_KEY;

const authentication = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
        res.send({ msg: "Please login" });
    }
    const decoded = jwt.verify(token, key);
    const userId = decoded.userId;
    if (decoded) {
        req.body.userId = userId;
        next();
    } else {
        res.send({ msg: "Plase login" });
    }
};

module.exports = {
    authentication,
};
