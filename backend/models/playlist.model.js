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
        timestamps: true, // Agrega las columnas createdAt y updatedAt automáticamente
        tableName: "playlists",
    });

    // Relación inversa: una lista pertenece a un usuario
    Playlist.associate = function(models) {
        Playlist.belongsTo(models.User, {
            foreignKey: 'userId', // Esta es la clave foránea que apunta a la tabla de usuarios
            as: 'user', // Alias para la relación (opcional, pero recomendado para claridad)
        });
    };

    return Playlist; // Retornar el modelo
};
