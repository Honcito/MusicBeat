const db = require("../models");
const SongInList = db.SongInList;
const Playlist = db.Playlist;
const Song = db.Song;

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

    // Verificar si la canción ya está en la playlist
    SongInList.findOne({
        where: {
            playlistId: req.body.playlistId,
            songId: req.body.songId
        }
    })
    .then(existingSongInList => {
        if (existingSongInList) {
            return res.status(400).send({
                message: "La canción ya está en esta playlist."
            });
        }

        // Si no está, creamos la relación
        SongInList.create(songInListEntry)
            .then(() => {
                res.status(201).json({ message: "Canción añadida a la playlist con éxito." });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error al añadir la canción a la playlist."
                });
            });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error al verificar la existencia de la canción en la playlist."
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

// Obtener las canciones de una playlist específica
exports.getSongsByPlaylist = (req, res) => {
    const playlistId = req.params.playlistId; // Obtener el id de la playlist desde los parámetros de la URL

    // Buscamos todas las canciones que están asociadas a esta playlist
    SongInList.findAll({
        where: { playlistId: playlistId },
        include: [
            { model: Playlist, as: 'playlist', where: { id: playlistId } },  // Asegúrate de usar el alias 'playlist'
            { model: Song, as: 'song' }  // Asegúrate de usar el alias 'song'
        ]
    })
    .then(data => {
        if (data.length === 0) {
            return res.status(404).send({
                message: "No se encontraron canciones en la playlist con id " + playlistId
            });
        }
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error al recuperar las canciones de la playlist."
        });
    });
};

// Eliminar una canción de una playlist
exports.removeSongFromPlaylist = (req, res) => {
    const { playlistId, songId } = req.params;  // Obtener playlistId y songId de los parámetros de la URL
  
    // Eliminar la relación entre la canción y la playlist
    db.SongInList.destroy({
      where: { playlistId, songId },  // Eliminar la relación de la canción con la playlist
    })
      .then((num) => {
        if (num === 1) {
          res.status(200).send({ message: "Canción eliminada de la playlist con éxito." });
        } else {
          res.status(404).send({ message: "Canción no encontrada en esta playlist." });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error al eliminar la canción de la playlist.",
        });
      });
  };
