const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

// Agregar las instancias de Sequelize
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Cargar los modelos
db.User = require("./user.model.js")(sequelize, Sequelize);
db.Playlist = require("./playlist.model.js")(sequelize, Sequelize);
db.Song = require("./song.model.js")(sequelize, Sequelize);
db.SongInList = require("./songInList.model.js")(sequelize, Sequelize); 

// Luego definir las asociaciones
if (db.User.associate) db.User.associate(db);
if (db.Playlist.associate) db.Playlist.associate(db);
if (db.Song.associate) db.Song.associate(db);
if (db.SongInList.associate) db.SongInList.associate(db);


// Manejo de conexión
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos ha sido establecida correctamente.');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

module.exports = db;
