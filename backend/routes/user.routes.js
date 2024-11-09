

module.exports = app => {
    const express = require("express");
    const users = require("../controllers/user.controller.js");
    const router = require("express").Router();
    const authenticateJWT = require("../middleware/authenticateJWT");

    // Ruta protegida que requiere autenticación
    router.get("/profile", authenticateJWT, users.getUserProfile);
    
    // Crear un nuevo Usuario.
    router.post("/", users.create);

    // Recuperar todos los Usuarios.
    router.get("/", users.findAll);

    // Recuperar un Usuario con id.
    router.get("/:id", users.findOne);

    // Actualizar un Usuario con id.
    router.put("/:id", users.update);

    // Eliminar un Usuario con id.
    router.delete("/:id", users.delete);

    // Eliminar todos los Usuario.
    router.delete("/", users.deleteAll);

    // Prefijo para todas las rutas.
    app.use("/api/users", router); 
};