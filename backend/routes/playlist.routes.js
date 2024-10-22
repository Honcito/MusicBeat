const { songs } = require("../models/index.js");


module.exports = app => {
    const express = require("express");
    const playlists = require("../controllers/playlist.controller.js");

    const router = require("express").Router();

    // Create a new Playlist.
    router.post("/", playlists.create);

    // Retrieve all Playlists.
    router.get("/", playlists.findAll);

    // Retrieve a Playlist by Id.
    router.get("/:id", playlists.findOne);

    // Uptdate a Playlist by Id.
    router.put("/:id", playlists.update);

    // Delete a Playlist by Id.
    router.delete("/:id", playlists.delete);

    // Delete all Playlists.
    router.delete("/", playlists.deleteAll);

    // Prefix for all the routes.
    app.use("/api/playlists", router); 
};