require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { userInfo } = require('os');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/henrybank`, {
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
const { Account } = sequelize.models;
const { UserInfo } = sequelize.models;
const { Card } = sequelize.models;
const { Transaction } = sequelize.models;
const { User } = sequelize.models;
const { Contact } = sequelize.models;

// Console logging sequelize models
console.log(sequelize.models)

// Models associations

// User associations
User.hasOne(UserInfo);
User.hasOne(Account);
Account.belongsTo(User);

// Account associations
Account.hasOne(Card);
Card.belongsTo(Account);

// Transaction associations
Transaction.belongsTo(User, {as: 'sender'})
Transaction.belongsTo(User, {as: 'receiver'})

// Friend associations
Contact.belongsTo(User, { foreignKey : 'userId', constraints: false});
Contact.belongsTo(User, { foreignKey : 'is_friend_of' , constraints:false});



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};