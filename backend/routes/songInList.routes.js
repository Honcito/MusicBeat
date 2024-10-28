const { songs } = require("../models/index.js");


module.exports = app => {
    const express = require("express");
    const songs = require("../controllers/songInList.controller.js");

    const router = require("express").Router();

  

    // Prefix for all the routes.
    app.use("/api/songInList", router); 
};