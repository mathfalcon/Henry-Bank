const { DataTypes } = require("sequelize");
const crypto = require("crypto");

module.exports = (sequelize) => {
  sequelize.define("transaction", {
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.ENUM,
        values: ['created', 'inProcess', 'complete', 'cancelled'],
        allowNull: false
    }
  });
};
