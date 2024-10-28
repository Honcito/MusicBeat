const express = require("express");
const cors = require('cors');
const db = require("./models");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura CORS
const corsOptions = {
  origin: 'http://localhost:8100', // Asegúrate de que esto sea correcto
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Usar CORS con las opciones configuradas
app.use(cors(corsOptions));

// Sincroniza la base de datos
db.sequelize.sync({ alter: true }).then(() => {
    console.log("Sync and alter table if necessary.");
    console.log("Initializing backend.");

    // Verifica la conexión a la base de datos
    db.sequelize.authenticate()
        .then(() => {
            console.log('Connection to the database has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
});

// A simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Music Beat" });
});

// Import routes into index.js
require("./routes/user.routes")(app);
require("./routes/song.routes")(app);
require("./routes/playlist.routes")(app);
require("./routes/songInList.routes")(app);

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack); // Imprime el error en la consola
    res.status(500).send({ message: "Something went wrong!" }); // Enviar respuesta de error
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}.`);
});
