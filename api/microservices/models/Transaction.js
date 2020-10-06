const { DataTypes } = require("sequelize");
const crypto = require("crypto");

module.exports = (sequelize) => {
  sequelize.define("transaction", {
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: { min: 0.0 },
    },
    message: {
        type: DataTypes.STRING,
        defaultValue: 'transaccion'
    },
    state: {
        type: DataTypes.ENUM,
        values: ['created', 'inProcess', 'complete', 'cancelled'],
        allowNull: false
    }
  });
};
