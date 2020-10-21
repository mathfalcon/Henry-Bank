const { DataTypes } = require("sequelize");
const crypto = require("crypto");

module.exports = (sequelize) => {
  sequelize.define("card", {
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const rSalt = this.randomSalt();
        this.setDataValue("saltcard", rSalt);
        this.setDataValue("number",
          crypto.createHmac("sha1", this.saltcard)
            .update(value).digest("hex"));
      },
    },
    cvv: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const rSalt = this.randomSalt();
        this.setDataValue("salt", rSalt);
        this.setDataValue("cvv",
          crypto.createHmac("sha1", this.salt)
            .update(value).digest("hex"));
      },
    },
    expiration_date: {
      type: DataTypes.DATE,
    },
    salt: {
      type: DataTypes.STRING,
    },
    saltcard: {
      type: DataTypes.STRING,
    },
  });
};
