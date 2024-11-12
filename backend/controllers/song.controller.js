const db = require("../models");
const Song = db.Song;
const Op = db.Sequelize.Op;

// Create and Save a new Song.
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.artist || !req.body.url) {
        return res.status(400).send({
            message: "Content cannot be empty! 'title', 'artist', and 'url' are required."
        });
    }

    // const songUrl = req.body.url ? req.body.url : `${process.env.API_URL}/music/${req.file.filename}`;
    // const coverUrl = req.body.cover ? req.body.cover : `${process.env.API_URL}/covers/${req.file.filename}`;

    // Create a song
    const song = {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        length: req.body.length,
        url: req.body.url,
        cover: req.body.cover
    };

    // Save Song in the database
    Song.create(song)
        .then(() => {
            return Song.findAll(); // Recover all songs after creation
        })
        .then(allSongs => {
            res.status(201).json(allSongs); // Get list of all songs
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the song."
            });
        });
}; // Cierre de la función create

// Retrieve all Songs from the database.
exports.findAll = (req, res) => {
    Song.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving songs."
            });
        });
};

// Find a single Song with an id.
exports.findOne = (req, res) => {
    const id = req.params.id;

    Song.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Song with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving Song with id=" + id
            });
        });
};

// Update a Song by the id in the request.
exports.update = (req, res) => {
    const id = req.params.id;

    Song.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Song was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Song with id=${id}. Maybe Song was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error updating Song with id=" + id
        });
    });
};

// Delete a Song with the specified id in the request.
exports.delete = (req, res) => {
    const id = req.params.id;

    Song.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Song was deleted successfully." // Mensaje de éxito
            });
        } else {
            res.send({
                message: `Cannot delete Song with id=${id}. Maybe Song was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Could not delete Song with id=" + id
        });
    });
};

// Delete all Songs from the database.
exports.deleteAll = (req, res) => {
    Song.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Songs were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Could not delete all Songs."
        });
    });
};
