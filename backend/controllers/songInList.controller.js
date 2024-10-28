const db = require("../models");
const SongInList = db.songInList; // Asegúrate de que el nombre coincida
const Playlist = db.playlists; // Importa el modelo de Playlist
const Song = db.songs; // Importa el modelo de Song

// Create and Save a new entry in SongInList.
exports.addSongToList = (req, res) => {
    // Validate request
    if (!req.body.playlistId || !req.body.songId) {
        return res.status(400).send({
            message: "Content cannot be empty! 'playlistId' and 'songId' are required."
        });
    }

    // Create a new SongInList entry
    const songInListEntry = {
        playlistId: req.body.playlistId,
        songId: req.body.songId,
    };

    // Save entry in the database
    SongInList.create(songInListEntry)
        .then(() => {
            res.status(201).json({ message: "Song added to playlist successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while adding the song to the playlist."
            });
        });
};

// Retrieve all entries from SongInList.
exports.findAll = (req, res) => {
    SongInList.findAll({ include: [Playlist, Song] }) // Incluye Playlist y Song para obtener información adicional
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving songs in playlists."
            });
        });
};

// Find a single entry in SongInList by id.
exports.findOne = (req, res) => {
    const id = req.params.id;

    SongInList.findByPk(id, { include: [Playlist, Song] })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find entry with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving entry with id=" + id
            });
        });
};

// Delete an entry in SongInList with the specified id in the request.
exports.delete = (req, res) => {
    const id = req.params.id;

    SongInList.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Song was removed from the playlist successfully."
            });
        } else {
            res.send({
                message: `Cannot delete entry with id=${id}. Maybe it was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Could not delete entry with id=" + id
        });
    });
};

// Delete all entries from SongInList.
exports.deleteAll = (req, res) => {
    SongInList.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} entries were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Could not delete all entries."
        });
    });
};
