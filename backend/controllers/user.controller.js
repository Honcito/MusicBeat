const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
//const bcrypt = require('bcrypt');

// Depuración: Verificar si el modelo User se carga correctamente
console.log("User model:", User); // Esto debería mostrar el modelo o undefined

// Create and Save a new User.
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty! 'name', 'email' and 'password' are required."
        });
        return;
    }

    // Cypher password
    //const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // Create an user
    const user = {
        username: req.body.username,
        email: req.body.email,
        //password: hashedPassword, // Cypher the password
        password: req.body.password
    };

    // Save User in the database
    User.create(user)
        .then(() => {
            return User.findAll(); // Recover all users after creation
        })
        .then(allUsers => {
            res.status(201).json(allUsers); // Get list of all users
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
}; // Cierre de la función create

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