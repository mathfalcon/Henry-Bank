const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "contact",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      birth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
      },
    });
};
