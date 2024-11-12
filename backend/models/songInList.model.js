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
      playlistId: {
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
      foreignKey: "playlistId",
      as: "playlist",
    });
    SongInList.belongsTo(models.Song, {
      foreignKey: "songId",
      as: "song",
    });
  };

  return SongInList;
};
