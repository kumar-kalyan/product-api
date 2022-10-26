const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                res.status(401).json({ message: "Invalid token" });
            }
            req.user = user;
            next();
        }
        )
    }
    else {
        res.status(401).json({ message: "Authentication failed" });
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
}

const veryifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        }
        else {
            res.status(403).json("Only admin is authorized to do that!");
        }
    })

}

module.exports = { verifyToken, verifyTokenAndAuthorization, veryifyTokenAndAdmin };