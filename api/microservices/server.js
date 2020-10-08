const path = require("path");
const gateway = require("express-gateway");

// Microservices require & routes.
require("./services/user");
require("./services/auth");
require("./services/register");
require("./services/transaction");
require("./services/contact");

const { conn } = require("./db.js");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  gateway().load(path.join(__dirname, "config")).run();
  console.log("base de datos inicializada");
});
