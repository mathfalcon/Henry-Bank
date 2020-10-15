const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("contact", {
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
