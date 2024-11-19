const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
    // Definición del modelo de Usuario
    const User = sequelize.define("User", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true, // Validar formato de correo electrónico
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "user", // Valor predeterminado
            validate: {
                isIn: [['user', 'admin']], // Validar los roles permitidos
            },
        },
        filename: {
            type: Sequelize.STRING, // Este es el campo donde se guardará la ruta de la imagen
        },
    }, {
        timestamps: true, // Esto asegura las columnas `createdAt` y `updatedAt`
        tableName: 'users', // Nombre de la tabla
    });

    // Hook para encriptar la contraseña antes de crear el usuario
    User.beforeCreate(async (user) => {
        const salt = await bcrypt.genSalt(10); // Sal de encriptación
        user.password = await bcrypt.hash(user.password, salt); // Encriptar la contraseña
    });

    // Definir asociaciones (relaciones) con otros modelos
    User.associate = function(models) {
        User.hasMany(models.Playlist, {
            foreignKey: 'userId',
            as: 'playlists',
        });
    };

    // Método para comparar la contraseña proporcionada con la almacenada
    User.prototype.comparePassword = function(password) {
        return bcrypt.compare(password, this.password);
    };

    return User; // Retornar el modelo
};
