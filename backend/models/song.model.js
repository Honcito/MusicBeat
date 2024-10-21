const { SELECT } = require("sequelize/lib/query-types");

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
            allowNull: true // Asegura que el campo de contraseña no sea nulo
        },
        length: {
            type: Sequelize.STRING, //length in "minutes:seconds" format
            allowNull: true // Asegura que el campo de contraseña no sea nulo
        },
        url: {
            type: Sequelize.STRING,
            required: true,
        },
        cover: {
            type: Sequelize.STRING,
            allowNull: true,
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
        tableName: "songs" // Nombre de la tabla
    });

    return Song; // Retornar el modelo
};

// Exportar el modelo
//module.exports = Employee; // Esta línea debe estar al final
