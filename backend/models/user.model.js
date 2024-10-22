module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true // Validar el formato del email
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false, // Asegura que el campo de contraseña no sea nulo
        },
    }, {
        timestamps: true, // Agrega las columnas createdAt y updatedAt automáticamente
        tableName: "users" // Nombre de la tabla
    });

    // Definir la asociación aquí
    User.associate = function(models) {
        User.hasMany(models.Playlist, {
            foreignKey: 'userId', // Asegúrate de que coincida con la clave foránea en el modelo Playlist
            as: 'playlists', // Alias para la relación
        });
    };

    return User; // Retornar el modelo
};
