const express = require("express");
const { User, Account } = require("../db.js");
const server = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

///////////////
// MIDDLEWARES
///////////////
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev")); // Intializing console logger middleware for HTTP requests.

///////////////
// ROUTES /GET/
///////////////

// Route for getting all users
server.get("/users", (req, res, next) => {
  User.findAll({ include: [{ model: Account }] })
    .then((users) => { res.send({ success: true, message: "Users list: ", users }) })
    .catch((err) => res.status(400).send({ success: false, message: "Something went wrong: ", err }));
});
// Route for getting a specific users
server.get("/users/:id", (req, res, next) => {
  User.findByPk(req.params.id, { include: [{ model: Account }] })
    .then((user) => { user ? res.send({ success: true, message: "User: ", user }) : res.send({ success: false, message: "User not found" }) })
    .catch((err) => res.status(400).send({ success: false, message: "Something went wrong: ", err }));
});

////////////////
// ROUTES /POST/
////////////////

// Route for posting a new user 
server.post("/users/create", (req, res, next) => {
  const { email, password, passcode, docType, docNumber, name, surname, birth, phone, street, streetNumber, locality, state, country, role } = req.body;
  User.create({ email, password, passcode, docType, docNumber, name, surname, birth, phone, street, streetNumber, locality, state, country, role })
    .then(userCreated => {
      Account.create({ userId: userCreated.id }).then(accCreated => res.send({ success: true, message: "User and Account Created: ", userCreated, accCreated }))
    })
    .catch((err) => {
      console.log(err)
      res.send({ success: false, message: "Something went wrong: ", err })
    });
});

///////////////
// ROUTES /PUT/
///////////////

// Route for updating an user information
server.put("/users/update/:id", (req, res, next) => {
  const { email, password, passcode, docType, docNumber, name, surname, birth, phone, street, streetNumber, locality, state, country, role } = req.body;
  User.findByPk(req.params.id)
    .then(user => { user.update({ email, password, passcode, docType, docNumber, name, surname, birth, phone, street, streetNumber, locality, state, country, role }) })
    .then((updatedUser) => res.send({ success: true, message: "Updated User: ", updatedUser }))
    .catch((err) => res.status(400).send({ success: false, message: "Something went wrong: ", err }));
});

/////////////////
// ROUTES /PATCH/
/////////////////

// Route to promote the user role to admin 
server.patch("/users/promote/:id", (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => { user.update({ role: "admin" }) })
    .then((promotedUser) => res.send({ success: true, message: "Promoted User: ", promotedUser }))
    .catch((err) => res.status(400).send({ success: false, message: "Something went wrong: ", err }));
});

//////////////////
// ROUTES /DELETE/
//////////////////

// Route to delete an user 
server.delete("/users/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then((deletedRecord) => {
      if (deletedRecord === 1)
        res.send({ success: true, message: "User Deleted" });
      else res.status(400).send({ success: false, message: "User not found" });
    })
    .catch((err) => res.status(400).send({ success: false, message: "Something went wrong: ", err }));
});

server.listen(3000, () => {
  console.log("User service running on 3000");
});

module.exports = server;