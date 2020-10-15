require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const crypto = require("crypto");

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/henrybank`, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Read all files in Models folder, require them
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Sequelize injection
modelDefiners.forEach(model => model(sequelize));
// Capitalize models' names
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// In sequelize.models we have all the models, using destructuring we assign them to a variable
const { Account, Avatar, Card, Transaction, User, Contact } = sequelize.models;


// Console logging sequelize models
console.log(sequelize.models)

// Models associations

// User associations
User.hasOne(Account);
Account.belongsTo(User);
User.hasOne(Avatar);
Avatar.belongsTo(User);

// Account associations
Account.hasOne(Card);
Card.belongsTo(Account);

// Transaction associations
Transaction.belongsTo(User, { as: 'sender' })
Transaction.belongsTo(User, { as: 'receiver' })

// Friend associations
Contact.belongsTo(User, { foreignKey: 'userId', constraints: false });
Contact.belongsTo(User, { foreignKey: 'is_contact_of', constraints: false });


// Prototype methods
User.prototype.checkPassword = function (password) {
  return (
    crypto
      .createHmac("sha1", this.salt)
      .update(password)
      .digest("hex") === this.password
  )
};
User.prototype.checkPasscode = function (passcode) {
  return (
    crypto
      .createHmac("sha1", this.salt)
      .update(passcode)
      .digest("hex") === this.passcode
  )
};
User.prototype.randomSalt = function () {
  return crypto.randomBytes(20).toString('hex');
}


module.exports = {
  ...sequelize.models, // to allow destructuring when importing models: const { Product, User } = require('./db.js');
  conn: sequelize,     // to import the connection: { conn } = require('./db.js');
};