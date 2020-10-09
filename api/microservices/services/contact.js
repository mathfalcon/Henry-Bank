const express = require("express");
const { Contact } = require("../db.js");
const server = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");

////////////////
// MIDDLEWARES /
////////////////

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev")); // Intializing console logger middleware for HTTP requests.

///////////////
// ROUTES /GET/
///////////////

// Route for getting all contacts
server.get("/contacts", (req, res, next) => {
  Contact.findAll({ include: [{ model: Account }] })
    .then((contacts) => {
      res.send({ success: true, message: "Contacts list: ", contacts });
    })
    .catch((err) =>
      res
        .status(400)
        .send({ success: false, message: "Something went wrong: ", err })
    );
});

// Route for getting a specific contact
server.get("/contacts/:id", (req, res, next) => {
  Contact.findByPk(req.params.id, { include: [{ model: Account }] })
    .then((contact) => {
      contact
        ? res.send({ success: true, message: "Contact: ", contact })
        : res.send({ success: false, message: "Contact not found" });
    })
    .catch((err) =>
      res
        .status(400)
        .send({ success: false, message: "Something went wrong: ", err })
    );
});

////////////////
// ROUTES /POST/
////////////////

// Route for posting a new contact
server.post("/contacts/create", (req, res, next) => {
  const { email, name, surname, nickname, phone } = req.body;
  Contact.create({ email, name, surname, nickname, phone })
    .then((contactCreated) => {
      res.send({ success: true, message: "Contact created: ", contactCreated });
    })
    .catch((err) =>
      res
        .status(400)
        .send({ success: false, message: "Something went wrong: ", err })
    );
});

///////////////
// ROUTES /PUT/
///////////////

// Route for updating a contact information
server.put("/contacts/update/:id", (req, res, next) => {
  const { email, name, surname, nickname, phone } = req.body;
  Contact.findByPk(req.params.id)
    .then((contact) => {
      contact.update({ email, name, surname, nickname, phoner });
    })
    .then((updatedContact) =>
      res.send({ success: true, message: "Updated contact: ", updatedContact })
    )
    .catch((err) =>
      res
        .status(400)
        .send({ success: false, message: "Something went wrong: ", err })
    );
});

//////////////////
// ROUTES /DELETE/
//////////////////

// Route to delete a contact
server.delete("/users/:id", (req, res) => {
  Contact.destroy({ where: { id: req.params.id } })
    .then((deletedRecord) => {
      if (deletedRecord === 1)
        res.send({ success: true, message: "Contact deleted" });
      else
        res.status(400).send({ success: false, message: "Contact not found" });
    })
    .catch((err) =>
      res
        .status(400)
        .send({ success: false, message: "Something went wrong: ", err })
    );
});

server.listen(3004, () => {
  console.log("Contact service running on 3004");
});

module.exports = server;
