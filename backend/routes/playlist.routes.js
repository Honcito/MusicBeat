const { songs } = require("../models/index.js");


module.exports = app => {
    const express = require("express");
    const playlists = require("../controllers/playlist.controller.js");

    const router = require("express").Router();

// Ruta para obtener todas las playlists
router.get("/", playlists.getAllPlaylists);

  // Crear una nueva playlist
router.post("/", playlists.create);

// Obtener todas las playlists de un usuario
router.get("/user/:userId", playlists.findAllByUser);

// Añadir una canción a una playlist
router.post("/addSong", playlists.addSongToPlaylist);

 // Ruta para eliminar una playlist por ID
 router.delete("/:id", playlists.delete);

    // Prefix for all the routes.
    app.use("/api/playlists", router); 
};