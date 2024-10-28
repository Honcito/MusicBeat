module.exports = (sequelize, Sequelize) => {
    const Playlist = sequelize.define("Playlist", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users', 
                key: 'id'
            }
        },
    }, {
        timestamps: true,
        tableName: 'playlists',
    });

    // Relaciones
    Playlist.associate = function(models) {
        Playlist.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
        Playlist.hasMany(models.SongInList, { // Relación con SongInList
            foreignKey: 'playlistId',
            as: 'songsInList', // Alias para acceder a las canciones en la lista
        });
    };

    return Playlist; // Retornar el modelo
};
