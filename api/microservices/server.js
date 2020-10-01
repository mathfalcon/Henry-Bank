const path = require("path");
const gateway = require("express-gateway");
require("./services/user");


const { conn } = require("./db.js");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  gateway().load(path.join(__dirname, "config")).run();
  console.log("base de datos inicializada");
});
