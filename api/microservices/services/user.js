const express = require("express");
const { User } = require("../db.js");

let server = express();

// Route for getting all users in db
server.get("/users", (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => res.send(err));
});

// Route for posting a new user to db
server.post("/users", (req, res, next) => {
  const { email, password, passcode, img, docType, docNumber, name, surname, birth, phone, street, street_number, locality, state, country, } = req.body;

  //   User.create({
  //     email: email,
  //     password: password,
  //   });

});

server.put("/users/update/:id", (req, res, next) => {
  const { email, password, passcode, img, docType, docNumber, name, surname, birth, phone, street, street_number, locality, state, country, } = req.body;
  User.findByPk(req.params.id)
    .then(user => {
      user.update({ email, password, passcode, img, docType, docNumber, name, surname, birth, phone, street, street_number, locality, state, country, })
    }).then((upduser) => res.send(upduser)
    ).catch((err) => res.send(err));
});

server.patch("/users/promote/:id", (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => {
      user.update({ role: "admin" })
    }).then((upduser) => res.send(upduser)
    ).catch((err) => res.send(err));
});

server.listen(3000, () => {
  console.log("Server running on 3000");
});

module.exports = server;
