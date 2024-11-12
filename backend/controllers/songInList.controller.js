

const db = require("../models");
const SongInList = db.SongInList;
const Playlist = db.Playlists;
const Song = db.Songs;

// Añadir una canción a una playlist
exports.addSongToList = (req, res) => {
    if (!req.body.playlistId || !req.body.songId) {
        return res.status(400).send({
            message: "playlistId y songId son necesarios."
        });
    }

    const songInListEntry = {
        playlistId: req.body.playlistId,
        songId: req.body.songId,
    };

    SongInList.create(songInListEntry)
        .then(() => {
            res.status(201).json({ message: "Canción añadida a la playlist con éxito." });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al añadir la canción a la playlist."
            });
        });
};

// Obtener todas las canciones en playlists
exports.findAll = (req, res) => {
    SongInList.findAll({ include: [Playlist, Song] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al recuperar las canciones en playlists."
            });
        });
};

// Obtener una canción específica en una playlist por ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    SongInList.findByPk(id, { include: [Playlist, Song] })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la entrada con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al recuperar la entrada con id=" + id
            });
        });
};

// Eliminar una canción de una playlist por ID
exports.delete = (req, res) => {
    const id = req.params.id;

    SongInList.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "La canción fue eliminada de la playlist con éxito."
            });
        } else {
            res.send({
                message: `No se pudo eliminar la entrada con id=${id}. Quizás no fue encontrada.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "No se pudo eliminar la entrada con id=" + id
        });
    });
};
