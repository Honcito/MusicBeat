const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require('../models');

// Se debe usar una clave secreta para firmar el token
const JWT_SECRET = process.env.JWT_SECRET;

// Función de registro de usuario
const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Crear un nuevo usuario
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Crear un token JWT
        const token = jwt.sign(
            { id: newUser.id, username: newUser.username, role: newUser.role },
            JWT_SECRET, // Usar la clave secreta del .env
            { expiresIn: '1h' } // Expiración del token (1 hora)
        );

        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Función de login de usuario
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Crear el token JWT
        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email, role: user.role },
            JWT_SECRET, // Clave secreta para firmar el token
            { expiresIn: "1h" } // Expira en una hora
        );

        // Enviar la respuesta con el token
        res.status(200).json({
            message: "Login successful",
            token: token,  // Enviar el token en la respuesta
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    register,
    login
};
