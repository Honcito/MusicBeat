const db = require("../models");
const Playlist = db.Playlist; // Aquí la referencia correcta al modelo Playlist
const Op = db.Sequelize.Op;

// Crear y guardar una nueva Playlist
exports.create = (req, res) => {
    // Validar request
    if (!req.body.name || !req.body.userId) {
        return res.status(400).send({
            message: "El nombre de la playlist y el userId son requeridos."
        });
    }

    // Crear una Playlist
    const playlist = {
        name: req.body.name,
        userId: req.body.userId // Asocia la playlist con el usuario que la crea
    };

    // Guardar Playlist en la base de datos
    Playlist.create(playlist)
        .then(data => res.status(201).json(data)) // Devuelve la playlist creada
        .catch(err => res.status(500).send({
            message: err.message || "Error al crear la playlist."
        }));
};

// Obtener todas las Playlists de un usuario específico
exports.findAllByUser = (req, res) => {
    const userId = req.params.userId; // Recupera el userId desde los parámetros de la URL

    Playlist.findAll({ where: { userId } })
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
            message: err.message || "Error al recuperar las playlists."
        }));
};

// Agregar función para añadir una canción a una playlist
exports.addSongToPlaylist = (req, res) => {
    const { playlistId, songId } = req.body;

    db.SongInList.create({
        playlistId,
        songId
    })
    .then(() => res.status(201).send({ message: "Canción añadida a la playlist con éxito." }))
    .catch(err => res.status(500).send({
        message: err.message || "Error al añadir la canción a la playlist."
    }));
};
