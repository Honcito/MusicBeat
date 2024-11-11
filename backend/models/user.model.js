const { toDefaultValue } = require("sequelize/lib/utils");
const bcrypt = require("bcrypt")

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
        role: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "user", // Valor predeterminado, si es necesario
            validate: {
                isIn: [['user', 'admin']]
            }
        },
        // photo
        filename: {
            type: Sequelize.STRING,
        },
    }, {
        timestamps: true, // Agrega las columnas createdAt y updatedAt automáticamente
        tableName: 'users', // Nombre de la tabla
    });

    // Encriptar la contraseña antes de crear el usuario
    User.beforeCreate(async (user) => {
        // hace que el hash sea más seguro
        const salt = await bcrypt.genSalt(10);
        // Encriptar la contraseña de texto plano a encriptada
        user.password = await bcrypt.hash(user.password, salt);
    })

    // Definir la asociación aquí
    User.associate = function(models) {
        User.hasMany(models.Playlist, {
            foreignKey: 'userId',
            as: 'playlists',
        });
    };

    // Método para comparar la contraseña con el segundo campo de contraseña
    User.prototype.comparePassword = function(password) {
        return bcrypt.compare(password, this.password);
    }

    return User; // Retornar el modelo
};
