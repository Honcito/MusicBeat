const express = require("express");
const cors = require("cors");
const path = require('path');
const multer = require('multer'); // Importar multer para manejar la carga de archivos
const db = require("./models");
require('dotenv').config();




const app = express();

// Configura multer para almacenar imágenes en la carpeta 'public/images'
const storage = multer.diskStorage({
  destination: './public/images', // Directorio de destino
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Asigna un nombre único a cada archivo
  },
});
const upload = multer({ storage }); // Inicializa multer con la configuración de almacenamiento

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS
const corsOptions = {
  origin: "http://localhost:8100",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Sincroniza la base de datos
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Sync and alter table if necessary.");
  console.log("Initializing backend.");

  db.sequelize.authenticate()
    .then(() => console.log("Connection to the database has been established successfully."))
    .catch((err) => console.error("Unable to connect to the database:", err));
});

// Sirve archivos estáticos para las imágenes de perfil y otros
app.use("/public", express.static(path.join(__dirname, 'public')));

// Sirve archivos estáticos para las canciones
app.use("/music", express.static(path.join(__dirname, 'music')));

// Sirve archivos estáticos para las portadas
app.use("/cover", express.static(path.join(__dirname, 'cover')));


// Importa las rutas
const userRoutes = require("./routes/user.routes"); // Importar el router de usuarios

// Usar las rutas de usuarios
app.use("/api/users", userRoutes); // Aquí es donde usamos el router
// Importar las rutas para song, playlist, y songInList
require("./routes/song.routes")(app);
require("./routes/playlist.routes")(app);
require("./routes/songInList.routes")(app);  // Importa y usa las rutas de songInList

// Ruta simple para verificar el servidor
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Music Beat" });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

// Inicia el servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
