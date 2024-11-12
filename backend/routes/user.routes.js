const express = require("express");
const users = require("../controllers/user.controller.js");
const router = express.Router();  // Usar 'express.Router()' para definir las rutas
const upload = require('../multer/upload'); // Importar el middleware de Multer

// Ruta para crear un nuevo Usuario (usando Multer para la carga de imágenes)
router.post("/", upload.single('image'), users.create);  // Multer 'image' es el campo del formulario

// Ruta para recuperar todos los usuarios
router.get("/", users.findAll);

// Ruta para recuperar un usuario por su id
router.get("/:id", users.findOne);

// Ruta para actualizar un usuario por su id
router.put("/:id", users.update);

// Ruta para eliminar un usuario por su id
router.delete("/:id", users.delete);

// Ruta para eliminar todos los usuarios
router.delete("/", users.deleteAll);

// Exportar el router, no app.use() aquí
module.exports = router;
