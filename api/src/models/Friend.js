const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("friend", {
    type: {
      type: DataTypes.ENUM,
      values: ['friends', 'pending_first_second', 'pending_second_first']
    },
  });
};
