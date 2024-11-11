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
app.use("/public", express.static(path.join(__dirname, 'public/images')));

// Rutas de Usuarios: crear un usuario con carga de imagen
app.post("/api/users", upload.single('image'), (req, res) => {
  const { username, email, password, role } = req.body;
  const imagePath = req.file ? `/public/images/${req.file.filename}` : ''; // Ruta de la imagen

  const newUser = {
    username,
    email,
    password,
    role,
    imagePath,
  };

  // Guardar el nuevo usuario en la base de datos
  db.User.create(newUser)
    .then(user => res.json(user))
    .catch(err => {
      console.error("Error al crear el usuario:", err);
      res.status(500).send({ message: "Error al crear el usuario" });
    });
});

// Ruta simple para verificar el servidor
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Music Beat" });
});

// Importar otras rutas
require("./routes/user.routes")(app);
require("./routes/song.routes")(app);
require("./routes/playlist.routes")(app);
require("./routes/songInList.routes")(app);

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
