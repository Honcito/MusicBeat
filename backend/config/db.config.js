

module.exports = {
    HOST: "localhost", //"localhost"
    USER: "root",
    PASSWORD: "",
    DB:  "music_beat",
    dialect: "mysql",
    pool: {
        max: 30,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};