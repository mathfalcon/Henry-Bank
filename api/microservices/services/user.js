const express = require("express");
const { User } = require("../db.js");
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
// ROUTES
///////////////

// Route for getting all users in db
server.get("/users", (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => res.send(err));
});

// Route for posting a new user to db
server.post("/users/create", (req, res, next) => {
  const { email, password, passcode, docType, docNumber, name, surname, birth, phone, street, street_number, locality, state, country, role } = req.body;

  User.create({
    email, role, password, passcode, docType, docNumber, name, surname, birth, phone, street, street_number,
    locality, state, country
  }).then(userCreated => {
    res.status(200).send(userCreated)
  }).catch(err => res.send(err))
});
// Route to update an user information in db
server.put("/users/update/:id", (req, res, next) => {
  const { email, docType, docNumber, name, surname, birth, phone, street, street_number, locality, state, country, } = req.body;
  User.findByPk(req.params.id)
    .then(user => {
      user.update({ email, docType, docNumber, name, surname, birth, phone, street, street_number, locality, state, country, })
    }).then((updatedUser) => res.send(updatedUser)
    ).catch((err) => res.status(400).send(err));
});
// Route to promote the user role to admin in db
server.patch("/users/promote/:id", (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => {
      user.update({ role: "admin" })
    }).then((updatedUser) => res.send(updatedUser)
    ).catch((err) => res.status(400).send(err));
});
// Route to delete an user from db
server.delete("/users/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } }).then((deletedRecord) => {
    if (deletedRecord === 1)
      res.status(200).json({ message: "Usuario eliminado" });
    else res.status(400).json({ message: "Usuario no encontrado" });
  });
});

server.listen(3000, () => {
  console.log("User service running on 3000");
});

module.exports = server;
