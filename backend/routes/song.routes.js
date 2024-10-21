const { songs } = require("../models/index.js");


module.exports = app => {
    const express = require("express");
    const songs = require("../controllers/song.controller.js");

    const router = require("express").Router();

    // Create a new Song.
    router.post("/", songs.create);

    // Retrieve all Songs.
    router.get("/", songs.findAll);

    // Retrieve a Song by Id.
    router.get("/:id", songs.findOne);

    // Uptdate a Song by Id.
    router.put("/:id", songs.update);

    // Delete a Song by Id.
    router.delete("/:id", songs.delete);

    // Delete all Songs.
    router.delete("/", songs.deleteAll);

    // Prefix for all the routes.
    app.use("/api/songs", router); 
};