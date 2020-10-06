const express = require("express");
const { User, Account, Transaction } = require("../db.js");
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
  User.findAll()
    .then((users) => { res.send({ success: true, message: "Users list: ", users }) })
    .catch((err) => res.status(400).send({ success: false, message: "Something went wrong: ", err }));
});
// Route for getting a specific users
server.get("/users/:id", (req, res, next) => {
  User.findByPk(req.params.id)
    .then((user) => { user ? res.send({ success: true, message: "User: ", user }) : res.send({ success: false, message: "User not found" }) })
    .catch((err) => res.status(400).send({ success: false, message: "Something went wrong: ", err }));
});
// Route for getting user income
server.get("/users/income/:id", (req, res, next) => {
  Account.findOne({ where: { userId: id } })
    .then((account) => {
      Transaction.findAll({ where: { receiver: account.id } })
        .then((transactions) => {
          for (let i = 0, sum = 0; i < transactions.length; i++)
            if (transactions[i].state === 'complete') sum += transactions[i].amount
          res.send({ success: true, message: "Your incomes are: ", sum })
        })
        .catch((err) => res.status(400).send({ success: false, message: "Something went wrong: ", err }));
    })
    .catch((err) => res.status(400).send({ success: false, message: "Something went wrong: ", err }));
});
// Route for getting user outcome
server.get("/users/outcome/:id", (req, res, next) => {
  Account.findOne({ where: { userId: id } })
    .then((account) => {
      Transaction.findAll({ where: { sender: account.id } })
        .then((transactions) => {
          for (let i = 0, sum = 0; i < transactions.length; i++)
            if (transactions[i].state === 'complete') sum += transactions[i].amount
          res.send({ success: true, message: "Your outcomes are: ", sum })
        })
        .catch((err) => res.status(400).send({ success: false, message: "Something went wrong: ", err }));
    })
    .catch((err) => res.status(400).send({ success: false, message: "Something went wrong: ", err }));
});

////////////////
// ROUTES /POST/
////////////////

// Route for posting a new user 
server.post("/users/create", (req, res, next) => {
  const { email, password, passcode, docType, docNumber, name, surname, birth, phone, street, street_number, locality, state, country, role } = req.body;
  User.create({ email, password, passcode, docType, docNumber, name, surname, birth, phone, street, street_number, locality, state, country, role })
    .then(userCreated => {
      Account.create({ userId: userCreated.id });
      res.send({ success: true, message: "User Created: ", userCreated })
    })
    .catch((err) => res.status(400).send({ success: false, message: "Something went wrong: ", err }));
});
// Route for posting a 'created' transaction
server.post("/users/transaction/:sender/to/:receiver", (req, res, next) => {
  const { amount, message } = req.body;
  Transaction.create({ sender: req.params.sender, receiver: req.params.receiver, amount, message, state: 'created' })
    .then(transactionCreated => { res.send({ success: true, message: "Transaction Created: ", transactionCreated }) })
    .catch((err) => res.status(400).send({ success: false, message: "Something went wrong: ", err }));
});
// Route for posting a 'charge' of money to an account
server.post("/users/transaction/:sender/to/:receiver", (req, res, next) => {
  const { amount, message } = req.body;
  Transaction.create({ sender: req.params.sender, receiver: req.params.receiver, amount, message, state: 'created' })
    .then(transactionCreated => { res.send({ success: true, message: "Transaction Created: ", transactionCreated }) })
    .catch((err) => res.status(400).send({ success: false, message: "Something went wrong: ", err }));
});
///////////////
// ROUTES /PUT/
///////////////

// Route for updating an user information
server.put("/users/update/:id", (req, res, next) => {
  const { email, password, passcode, docType, docNumber, name, surname, birth, phone, street, street_number, locality, state, country, role } = req.body;
  User.findByPk(req.params.id)
    .then(user => { user.update({ email, password, passcode, docType, docNumber, name, surname, birth, phone, street, street_number, locality, state, country, role }) })
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
// Route for changing the state of a transaction ?state=value
server.patch("/users/transaction/:id/", (req, res, next) => {
  Transaction.findByPk(req.params.id)
    .then(transaction => {
      let validTransaction = true; // the transaction will be valid unless something go wrong
      switch (req.query.state) {
        case 'inProcess':
          User.findByPk(transaction.sender) // Search for the user tha sends the money
            .then(user => {
              if (user.balance >= transaction.amount) // It verifies that has sufficient funds
                Account.update( // takes away the money from his account
                  { balance: balance - transaction.amount },
                  { where: { userId: user.id } }
                )
              else {
                validTransaction = false;
                res.status(400).send({ success: false, message: "insufficient funds" })
              }
            })
          break;
        case 'cancelled':
          User.findByPk(transaction.sender) // Search for the user tha sends the money
            .then(user => Account.update( // gives back the money to his account
              { balance: balance + transaction.amount },
              { where: { userId: user.id } }
            ))
          break;
        case 'complete':
          User.findByPk(transaction.receiver) // Search for the user tha receives the money
            .then(user => Account.update( // put the money into his account
              { balance: balance + transaction.amount },
              { where: { userId: user.id } }
            ))
          break;
        default:
          validTransaction = false;
          res.send({ success: false, message: "invalid transaction state" })
          break;
      }
      validTransaction && transaction.update({ state: req.query.state })
    }).then((completedTransaction) => res.send({ success: true, message: "Transaction Completed : ", completedTransaction }))
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
