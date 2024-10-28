module.exports = (sequelize, Sequelize) => {
    const SongInList = sequelize.define(
      "SongInList",
      {
        songId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "songs", // Nombre de la tabla relacionada
            key: "id",
          },
        },
        playlistId: { // Cambié userId a playlistId
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "playlists", // Nombre de la tabla relacionada
            key: "id",
          },
        },
      },
      {
        timestamps: true,
        tableName: "songsInList",
      }
    );
  
    // Relaciones
    SongInList.associate = function (models) {
      SongInList.belongsTo(models.Playlist, {
        foreignKey: "playlistId", // Nombre de la clave foránea
        as: "playlist", // Alias para la relación
      });
      SongInList.belongsTo(models.Song, {
        foreignKey: "songId", // Nombre de la clave foránea
        as: "song", // Alias para la relación
      });
    };
  
    return SongInList; // Retornar el modelo
};
