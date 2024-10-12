

module.exports = app => {
    const express = require("express");
    const users = require("../controllers/user.controller.js");

    const router = require("express").Router();

    // Crear un nuevo Empleado.
    router.post("/", users.create);

    // Recuperar todos los Empleados.
    router.get("/", users.findAll);

    // Recuperar un Empleado con id.
    router.get("/:id", users.findOne);

    // Actualizar un Empleado con id.
    router.put("/:id", users.update);

    // Eliminar un Empleado con id.
    router.delete("/:id", users.delete);

    // Eliminar todos los Empleados.
    router.delete("/", users.deleteAll);

    // Prefijo para todas las rutas.
    app.use("/api/users", router); 
};