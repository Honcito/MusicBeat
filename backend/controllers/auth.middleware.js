const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    // Eliminar el "Bearer" del token
    const tokenWithoutBearer = token.split(' ')[1];

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized.' });
        }

        req.userId = decoded.id; // Decodifica el usuario para usarlo en otras rutas si es necesario
        next();
    });
};
