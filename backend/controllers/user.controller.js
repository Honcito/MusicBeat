const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Depuración: Verificar si el modelo User se carga correctamente
console.log("User model:", User); // Esto debería mostrar el modelo o undefined

//Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar que el email y la contraseña estén en la petición
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Buscar al usuario en la base de datos por email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Verificar que la contraseña coincida
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: "Invalid password." });
        }

        // Crear el token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Enviar la respuesta con el token y los detalles del usuario
        res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: "An error occurred during login.", error: error.message });
    }
};

// Create and Save a new User.
exports.create = (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.role) {
        return res.status(400).send({
            message: "Content can not be empty! 'username', 'email', 'password' and role are required."
        });
    }
 
    // Verifica si la imagen se ha subido
    if (req.file) {
        console.log('Imagen procesada por multer:', req.file); // Log de la imagen
        console.log('Ruta del archivo:', `public/images/${req.file.filename}`); // Log de la ruta de la imagen
    } else {
        console.log('No se procesó ningún archivo');
    }

    // Crear el objeto del usuario
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        filename: req.file ? `images/${req.file.filename}` : "" // Guardamos la ruta en el campo 'filename'
    };
 
    // Guardar el usuario en la base de datos
    User.create(user)
        .then(createdUser => {
            console.log('Usuario creado:', createdUser); // Log del usuario creado
            res.status(201).json({
                message: "User created successfully",
                user: createdUser
            });
        })
        .catch(err => {
            console.error('Error al crear el usuario:', err); // Log de error
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single User with an id.
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving User with id=" + id
            });
        });
};

// Update an User by the id in the request.
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating User with id=" + id
            });
        });
};

// Delete a User with the specified id in the request.
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Could not delete User with id=" + id
            });
        });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Could not delete all Users."
            });
        });
};

// Esta función puede devolver la información del perfil del usuario, por ejemplo, de la base de datos o del JWT.
/*exports.getUserProfile = (req, res) => {
    const userId = req.user.id; // Asegúrate de que 'req.user' tiene los datos correctos del usuario autenticado

    User.findByPk(userId)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving user profile", error: err.message });
        })
                .catch(err => {
                    res.status(500).send({ message: 'Error during authentication.' });
                });
        };
        
*/
