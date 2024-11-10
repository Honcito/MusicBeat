
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key"; // Usa una clave secreta más segura

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id; // Añadimos el id del usuario al request
        next();
    });
};

module.exports = verifyToken;
