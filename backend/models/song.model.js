module.exports = (sequelize, Sequelize) => {
    const Song = sequelize.define("Song", {
        title: {
            type: Sequelize.STRING, 
            required: true,
        },
        artist: {
            type: Sequelize.STRING, 
            required: true,
        },
        album: {
            type: Sequelize.STRING, 
            allowNull: true
        },
        length: {
            type: Sequelize.STRING, 
            allowNull: true 
        },
        url: {
            type: Sequelize.STRING,
            required: true,
        },
        cover: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    }, {
        timestamps: true,
        tableName: 'songs',
    });

    // Relaciones
    Song.associate = function(models) {
        Song.hasMany(models.SongInList, { // Relación con SongInList
            foreignKey: 'songId',
            as: 'songInList', // Alias para acceder a las listas de la canción
        });
    };

    return Song; // Retornar el modelo
};
