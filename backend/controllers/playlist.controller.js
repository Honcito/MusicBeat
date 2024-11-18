const db = require("../models");
const Playlist = db.Playlist; // Aquí la referencia correcta al modelo Playlist
const Op = db.Sequelize.Op;

exports.getAllPlaylists = (req, res) => {
  Playlist.findAll()
    .then(playlists => {
      res.json(playlists); // Devuelve todas las playlists en formato JSON
    })
    .catch(error => {
      console.error("Error al obtener las playlists:", error);
      res.status(500).send({ message: "Error al obtener las playlists" });
    });
};



// Crear y guardar una nueva Playlist
exports.create = (req, res) => {
  console.log("Contenido de req.body:", req.body);

  // Extraer userId del objeto de solicitud
  const userId = req.body.userId; // Tomar userId del cuerpo de la solicitud
  console.log("User  ID extraído:", userId);

  // Validar request
  if (!req.body.name) {
    return res.status(400).send({
      message: "El nombre de la playlist es requerido.",
    });
  }

  // Validar que userId no esté vacío
  if (!userId) {
    return res.status(400).send({
      message: "El ID de usuario es requerido.",
    });
  }

  // Crear una Playlist
  const playlist = {
    name: req.body.name,
    userId: userId, // Asocia la playlist con el usuario que la crea
  };

  // Guardar Playlist en la base de datos
  Playlist.create(playlist)
    .then((data) => res.status(201).json(data)) // Devuelve la playlist creada
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error al crear la playlist.",
      })
    );
};


// Obtener todas las Playlists de un usuario específico
/*
exports.findAllByUser = (req, res) => {
  const userId = req.params.userId; // Recupera el userId desde los parámetros de la URL

  Playlist.findAll({ where: { userId } })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error al recuperar las playlists.",
      })
    );
};
*/

exports.getPlaylistsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const playlists = await Playlist.findAll({ where: { userId } });

    if (playlists.length > 0) {
      return res.json(playlists);
    } else {
      return res.status(404).json({ message: 'No se encontraron playlists para este usuario.' });
    }
  } catch (error) {
    console.error("Error al obtener las playlists:", error);
    return res.status(500).json({ message: 'Error al obtener las playlists.' });
  }
};


// Agregar función para añadir una canción a una playlist
exports.addSongToPlaylist = (req, res) => {
  const { playlistId, songId } = req.body;

  db.SongInList.create({
    playlistId,
    songId,
  })
    .then(() =>
      res
        .status(201)
        .send({ message: "Canción añadida a la playlist con éxito." })
    )
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error al añadir la canción a la playlist.",
      })
    );
};

// Eliminar una playlist por ID
exports.delete = (req, res) => {
  const id = req.params.id; // Obtener el ID de la URL

  Playlist.destroy({
    where: { id: id }, // Eliminar la playlist cuyo id coincida
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Playlist eliminada con éxito.",
        });
      } else {
        res.status(404).send({
          message: `No se pudo eliminar la playlist con id=${id}. Tal vez no se encontró.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error al eliminar la playlist con id=${id}.`,
      });
    });
};




