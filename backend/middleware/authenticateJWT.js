const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;  // La misma clave secreta utilizada para firmar el token

// Middleware para verificar el token JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", ""); // Obtener el token del encabezado Authorization

    if (!token) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    try {
        // Verificar el token con la clave secreta
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;  // Guardar los datos del usuario decodificados en la solicitud
        next();  // Continuar con la siguiente función (ruta protegida)
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authenticateJWT;
