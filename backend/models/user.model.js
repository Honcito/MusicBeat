module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        username: {
            type: Sequelize.STRING, 
            allowNull: false
        },
        email: {
            type: Sequelize.STRING, 
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true // Validar el formato del email
            }
        },
        password: {
            type: Sequelize.STRING, 
            allowNull: false // Asegura que el campo de contraseña no sea nulo
        },
         // Asegúrate de incluir createdAt y updatedAt si no se están generando automáticamente
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
       
    }, {
        timestamps: true, // Agrega las columnas createdAt y updatedAt automáticamente
        tableName: "users" // Nombre de la tabla
    });

    return User; // Retornar el modelo
};

// Exportar el modelo
//module.exports = Employee; // Esta línea debe estar al final
