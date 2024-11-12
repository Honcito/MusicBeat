const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Directorio donde se guardará la imagen
    },
    filename: (req, file, cb) => {
        // Generar un nombre único para el archivo
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Inicialización de Multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

module.exports = upload; // Exportar el middleware para usarlo en las rutas
