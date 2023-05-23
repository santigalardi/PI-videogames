const { DataTypes, BOOLEAN } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'Videogame',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, //cada vez que se crea un nuevo registro en la tabla correspondiente, se generará automáticamente un UUID único para ese registro
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      released: {
        type: DataTypes.DATEONLY,
      },
      rating: {
        type: DataTypes.FLOAT,
      },
      genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      created: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
