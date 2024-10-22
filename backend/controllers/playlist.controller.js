const db = require("../models");
const Song = db.playlists;
const Op = db.Sequelize.Op;

// Create and Save a new Playlist.
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Content cannot be empty! 'name', is required."
        });
    }

    // Create a Playlist
    const playlist = {
        title: req.body.name,
        userId: req.body.userId //incluir el user_id aquí
    };

    // Save Playlist in the database
    Playlist.create(playlist)
        .then(() => {
            return Playlist.findAll(); // Recover all Playlists after creation
        })
        .then(allPlaylists => {
            res.status(201).json(allPlaylists); // Get list of all playlists
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the playlist."
            });
        });
}; // Cierre de la función create

// Retrieve all Playlists from the database.
exports.findAll = (req, res) => {
    Playlist.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving playlists."
            });
        });
};

// Find a single Playlist with an id.
exports.findOne = (req, res) => {
    const id = req.params.id;

    Song.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Playlist with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving Playlist with id=" + id
            });
        });
};

// Update a Playlist by the id in the request.
exports.update = (req, res) => {
    const id = req.params.id;

    Playlist.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Playlist was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Playlist with id=${id}. Maybe Playlist was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error updating Playlist with id=" + id
        });
    });
};

// Delete a Playlist with the specified id in the request.
exports.delete = (req, res) => {
    const id = req.params.id;

    Playlist.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Playlist was deleted successfully." // Mensaje de éxito
            });
        } else {
            res.send({
                message: `Cannot delete Playlist with id=${id}. Maybe Playlist was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Could not delete Playlist with id=" + id
        });
    });
};

// Delete all Playlist from the database.
exports.deleteAll = (req, res) => {
    Playlist.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Playlists were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Could not delete all Playlist."
        });
    });
};
