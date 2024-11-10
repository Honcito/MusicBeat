const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Ruta de registro de usuarios
router.post('/register', authController.register);

// Ruta para login de usuarios
router.post("/login", authController.login);

module.exports = router;
