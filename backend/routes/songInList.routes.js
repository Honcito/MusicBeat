module.exports = app => {
    const songsInList = require("../controllers/songInList.controller.js");
    const router = require("express").Router();

    // Añadir canción a playlist
    router.post("/", songsInList.addSongToList);

    // Obtener todas las canciones en playlists
    router.get("/", songsInList.findAll);

    // Obtener las canciones de una playlist por ID
    router.get("/playlist/:playlistId", songsInList.getSongsByPlaylist);

    // Obtener una canción específica en una playlist por ID
    router.get("/:id", songsInList.findOne);

    // Eliminar una canción de una playlist por ID
    router.delete("/:id", songsInList.delete);

    // Prefijo de las rutas de SongInList
    app.use("/api/songInList", router);
};
