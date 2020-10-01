const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("account", {
    balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['usDollar', 'argPeso']
    }
  });
};