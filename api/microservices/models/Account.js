const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("account", {
    balance: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0,
      validate: { min: 0.0 },
    },
    type: {
      type: DataTypes.ENUM,
      defaultValue: 'AR$',
      values: ['USD', 'AR$']
    },
    cvu: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};