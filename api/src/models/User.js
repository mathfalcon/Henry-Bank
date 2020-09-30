const { DataTypes } = require("sequelize");
const crypto = require("crypto");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      role: {
        type: DataTypes.ENUM,
        values: ["admin", "client"],
        defaultValue: "client",
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        set(value) {
          const rSalt = this.randomSalt();
          this.setDataValue("salt", rSalt);
          this.setDataValue(
            "password",
            crypto.createHmac("sha1", this.salt).update(value).digest("hex")
          );
        },
      },
      passcode: {
        type: DataTypes.INTEGER,
      },
      img: {
        type: DataTypes.BLOB,
        get() {
          return this.getDataValue("img").toString("utf8");
        },
      },
      salt: {
        type: DataTypes.STRING,
      }
    },
    {
      paranoid: true,
    }
  );
};
