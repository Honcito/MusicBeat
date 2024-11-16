const jwt = require('jsonwebtoken');
const db = require('../models'); // Importa los modelos para validar usuarios
const User = db.User; // Asegúrate de que "User" sea el modelo correcto

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Busca el usuario en la base de datos
    const user = await User.findByPk(decodedToken.id);
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    req.user = user; // Adjunta el usuario al objeto req
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token no válido o expirado' });
  }
};

module.exports = authenticateToken;
