const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).send({
            errorType: "Token not present",
            statuscode: 401,
            message: "Token required to access the endpoint",
        });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        next()
    } catch (error) {
        res.status(403).send({
            errorType: "Token Error",
            statusCode: 403,
            message: "Token not valid or expired",
        });

    }
};