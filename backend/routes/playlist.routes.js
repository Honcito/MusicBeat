const { songs } = require("../models/index.js");


module.exports = app => {
    const express = require("express");
    const playlists = require("../controllers/playlist.controller.js");

    const router = require("express").Router();

  // Crear una nueva playlist
router.post("/", playlists.create);

// Obtener todas las playlists de un usuario
router.get("/user/:userId", playlists.findAllByUser);

// Añadir una canción a una playlist
router.post("/addSong", playlists.addSongToPlaylist);

    // Prefix for all the routes.
    app.use("/api/playlists", router); 
};