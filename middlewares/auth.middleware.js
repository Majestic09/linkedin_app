require("dotenv").config()
const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const decoded = jwt.verify(token, process.env.key);
        if (decoded) {
            const userId = decoded.userId;
            req.body.userId = userId;
            next();
        } else {
            res.send("Please Login")
        }
    } else {
        res.send({"msg":"Please Login"})
    }
}

module.exports = {authentication}