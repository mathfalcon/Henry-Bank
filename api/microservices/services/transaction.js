const express = require("express");
const { Account, Transaction, User } = require("../db.js");
const server = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_API_KEY);
const { Op } = require("sequelize");

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
// Route for getting all transactions
server.get("/transactions", (req, res, next) => {
  Transaction.findAll({
    include: [
      {
        model: User,
        as: "sender",
        attributes: ["id", "email", "name", "surname"],
        include: Account,
      },
      {
        model: User,
        as: "receiver",
        attributes: ["id", "email", "name", "surname"],
        include: Account,
      },
    ],
  })
    .then((transactions) => {
      res.send({ success: true, message: "transactions list: ", transactions });
    })
    .catch((err) =>
      res
        .status(400)
        .send({ success: false, message: "Something went wrong: ", err })
    );
});
// Route for getting user income
server.get("/transactions/income/:userId", (req, res, next) => {
  Account.findOne({ where: { userId: req.params.userId } })
    .then((account) => {
      Transaction.findAll({ where: { receiver: account.id } })
        .then((transactions) => {
          let sum = 0;
          for (let i = 0; i < transactions.length; i++)
            if (transactions[i].state === "complete")
              sum += transactions[i].amount;
          res.send({ success: true, message: "Your incomes are: ", sum });
        })
        .catch((err) =>
          res
            .status(400)
            .send({ success: false, message: "Something went wrong: ", err })
        );
    })
    .catch((err) =>
      res
        .status(400)
        .send({ success: false, message: "Something went wrong: ", err })
    );
});
// Route for getting user outcome
server.get("/transactions/outcome/:userId", (req, res, next) => {
  Account.findOne({ where: { userId: req.params.userId } })
    .then((account) => {
      Transaction.findAll({ where: { sender: account.id } })
        .then((transactions) => {
          for (let i = 0, sum = 0; i < transactions.length; i++)
            if (transactions[i].state === "complete")
              sum += transactions[i].amount;
          res.send({ success: true, message: "Your outcomes are: ", sum });
        })
        .catch((err) =>
          res
            .status(400)
            .send({ success: false, message: "Something went wrong: ", err })
        );
    })
    .catch((err) =>
      res
        .status(400)
        .send({ success: false, message: "Something went wrong: ", err })
    );
});
// Route for getting user transactions from a specific date to another
server.get("/transactions/history/:userId", (req, res, next) => {
  const { startDate, toDate } = req.body;
  Promise.all([
  Transaction.findAll({ 
    where: {
      createdAt: { [Op.and]: [
       { [Op.gte]: startDate },
       { [Op.lte]: toDate },
      ]},   
      senderId: req.params.userId
  }}),
  Transaction.findAll({ 
    where: {
      createdAt: { [Op.and]: [
       { [Op.gte]: startDate },
       { [Op.lte]: toDate },
    ]},   
    receiverId: req.params.userId
  }})
  ])
  .then((transactions) => {
    let outcomes = transactions[0].reduce((total, trans) => trans.state === "complete" ? total + Number(trans.amount) : total, 0);
    let incomes = transactions[1].reduce((total, trans) => trans.state === "complete" ? total + Number(trans.amount) : total, 0);
    let total = incomes - outcomes;
  res.send({ transactions, total });
  })
  .catch((err) =>
      res.status(400)
        .send({ success: false, message: "Something went wrong: ", err })
    );
});
// Route to get the balance in the last 7 days
// server.get("/transactions/history/weekly/:userId", (req, res, next) => {
//   const { startDate, toDate } = req.body;
//   Transaction.findAll({
//     where: {
//         createdAt: {  startDate },
//         senderId: req.params.userId   
//     },
//     // attributes: [ sequilize.fn('date_trunc', 'month', sequilize.col('updatedAt'))
//     // ],
//     // group: 'month',
//     order: [ [ 'createdAt', 'ASC' ] ],
//   })
//   .then((account) => {
//     res.send({ account });
//   })
//   .catch((err) =>
//   res.status(400)
//     .send({ success: false, message: "Cannot get requiered balances: ", err })
// );
// });
// Route to get the balance in the last 7 days
server.get("/transactions/history/weekly/:userId", (req, res, next) => {
  const today = new Date(Date.now());
  const week = new Date(today - 1000 * 60 * 60 * 24 * 7).toISOString();
  const week1 = new Date(today - 1000 * 60 * 60 * 24 * 6).toISOString();
  const week2 = new Date(today - 1000 * 60 * 60 * 24 * 5).toISOString();
  const week3 = new Date(today - 1000 * 60 * 60 * 24 * 4).toISOString();
  const week4 = new Date(today - 1000 * 60 * 60 * 24 * 3).toISOString();
  const week5 = new Date(today - 1000 * 60 * 60 * 24 * 2).toISOString();
  const week6 = new Date(today - 1000 * 60 * 60 * 24 * 1).toISOString();
  const week7 = new Date(Date.now()).toISOString();


  Promise.all([
  Transaction.findAll({ 
    where: {
      createdAt: { [Op.and]: [
        { [Op.gte]: week },
        { [Op.lt]: week1 },
      ]},   
      senderId: req.params.userId
  }}),
  Transaction.findAll({ 
    where: {
      createdAt: { [Op.and]: [
        { [Op.gte]: week },
        { [Op.lt]: week1 },
    ]},   
      receiverId: req.params.userId
  }}),
  Transaction.findAll({ 
    where: {
      createdAt: { [Op.and]: [
        { [Op.gte]: week1 },
        { [Op.lt]: week2 },
      ]},   
      senderId: req.params.userId
  }}),
  Transaction.findAll({ 
    where: {
      createdAt: { [Op.and]: [
        { [Op.gte]: week1 },
        { [Op.lt]: week2 },
    ]},   
      receiverId: req.params.userId
  }}),
  Transaction.findAll({ 
    where: {
      createdAt: { [Op.and]: [
        { [Op.gte]: week2 },
        { [Op.lt]: week3 },
      ]},   
      senderId: req.params.userId
  }}),
  Transaction.findAll({ 
    where: {
      createdAt: { [Op.and]: [
        { [Op.gte]: week2 },
        { [Op.lt]: week3 },
    ]},   
      receiverId: req.params.userId
  }}),
  Transaction.findAll({ 
    where: {
      createdAt: { [Op.and]: [
        { [Op.gte]: week3 },
        { [Op.lt]: week4 },
      ]},   
      senderId: req.params.userId
  }}),
  Transaction.findAll({ 
    where: {
      createdAt: { [Op.and]: [
        { [Op.gte]: week3 },
        { [Op.lt]: week4 },
    ]},   
      receiverId: req.params.userId
  }}),
  Transaction.findAll({ 
    where: {
      createdAt: { [Op.and]: [
        { [Op.gte]: week4 },
        { [Op.lt]: week5 },
      ]},   
      senderId: req.params.userId
  }}),
  Transaction.findAll({ 
    where: {
      createdAt: { [Op.and]: [
        { [Op.gte]: week4 },
        { [Op.lt]: week5 },
    ]},   
      receiverId: req.params.userId
  }}),
  Transaction.findAll({ 
    where: {
      createdAt: { [Op.and]: [
        { [Op.gte]: week5 },
        { [Op.lt]: week6 },
      ]},   
      senderId: req.params.userId
  }}),
  Transaction.findAll({ 
    where: {
      createdAt: { [Op.and]: [
        { [Op.gte]: week5 },
        { [Op.lt]: week6 },
    ]},   
      receiverId: req.params.userId
  }}),
  Transaction.findAll({ 
    where: {
      createdAt: { [Op.and]: [
        { [Op.gte]: week6 },
        { [Op.lt]: week7 },
      ]},   
      senderId: req.params.userId
  }}),
  Transaction.findAll({ 
    where: {
      createdAt: { [Op.and]: [
        { [Op.gte]: week6 },
        { [Op.lt]: week7 },
    ]},   
      receiverId: req.params.userId
  }})
  ])
  .then((transactions) => {
    let outcomes1 = transactions[0].reduce((total, trans) => trans.state === "complete" ? total + Number(trans.amount) : total, 0);
    let incomes1 = transactions[1].reduce((total, trans) => trans.state === "complete" ? total + Number(trans.amount) : total, 0);
    let total1 = incomes1 - outcomes1;

    let outcomes2 = transactions[2].reduce((total, trans) => trans.state === "complete" ? total + Number(trans.amount) : total, 0);
    let incomes2 = transactions[3].reduce((total, trans) => trans.state === "complete" ? total + Number(trans.amount) : total, 0);
    let total2 = incomes2 - outcomes2;

    let outcomes3 = transactions[4].reduce((total, trans) => trans.state === "complete" ? total + Number(trans.amount) : total, 0);
    let incomes3 = transactions[5].reduce((total, trans) => trans.state === "complete" ? total + Number(trans.amount) : total, 0);
    let total3 = incomes3 - outcomes3;

    let outcomes4 = transactions[6].reduce((total, trans) => trans.state === "complete" ? total + Number(trans.amount) : total, 0);
    let incomes4 = transactions[7].reduce((total, trans) => trans.state === "complete" ? total + Number(trans.amount) : total, 0);
    let total4 = incomes4 - outcomes4;

    let outcomes5 = transactions[8].reduce((total, trans) => trans.state === "complete" ? total + Number(trans.amount) : total, 0);
    let incomes5 = transactions[9].reduce((total, trans) => trans.state === "complete" ? total + Number(trans.amount) : total, 0);
    let total5 = incomes5 - outcomes5;

    let outcomes6 = transactions[9].reduce((total, trans) => trans.state === "complete" ? total + Number(trans.amount) : total, 0);
    let incomes6 = transactions[10].reduce((total, trans) => trans.state === "complete" ? total + Number(trans.amount) : total, 0);
    let total6 = incomes6 - outcomes6;

    let outcomes7 = transactions[11].reduce((total, trans) => trans.state === "complete" ? total + Number(trans.amount) : total, 0);
    let incomes7 = transactions[12].reduce((total, trans) => trans.state === "complete" ? total + Number(trans.amount) : total, 0);
    let total7 = incomes7 - outcomes7;

  res.send([total1, total2, total3, total4, total5, total6, total7 ]);
  })
  .catch((err) =>
      res.status(400)
        .send({ success: false, message: "Something went wrong: ", err })
    );
});

////////////////
// ROUTES /POST/
////////////////

// Route for posting a 'created' transaction
server.post("/transactions/:sender/to/:receiver", (req, res, next) => {
  const { amount, message, passcode } = req.body;

  Promise.all([
    Account.findOne({ where: { userId: req.params.sender } }), // Search for the account that sends the money
    Account.findOne({ where: { userId: req.params.receiver } }), // Search for the account that receives the money
    User.findByPk(req.params.sender),
    User.findByPk(req.params.receiver)
  ]).then((acc) => {
    if (!acc[2].checkPasscode(passcode)) {
      res.send({
        success: false,
        message: "The provided actual passcode is incorrect",
      });
    }
    Number(acc[0].balance) >= amount // It verifies that has sufficient funds
      ? Promise.all([
          acc[0].update({ balance: Number(acc[0].balance) - Number(amount) }), // extract the money from sender account
          acc[1].update({ balance: Number(acc[1].balance) + Number(amount) }), // deposit the money into receiver account
        ]).then((accUpd) => {
          Transaction.create({
            senderId: req.params.sender,
            receiverId: req.params.receiver,
            amount,
            message,
            state: "complete",
            senderBalance: acc[0].balance,
            receiverBalance: acc[1].balance
          })
            .then((transactionCreated) => {
              const msg = {
                template_id: process.env.SENGRID_TEMPLATE_ID_TRANSACTION,
                "from": {
                  "email": process.env.SENGRID_SENDER_EMAIL,
                  "name": process.env.SENDGRID_SENDER_NAME,
                },
                "personalizations": [
                  {
                    "to": [
                      {
                        "email": accu[3].email,
                      },
                    ],
                    "dynamic_template_data": {
                      "senderAcc": acc[0].type,
                      "receiverAcc": acc[1].type,
                      "senderName": acc[0].name,
                      "receiverName": acc[1].name,
                      "amount": req.body.amount,
                      "message": req.body.message
                    }
                  }
                ]
              };
              sgMail
              .send(msg)
              .then((data) => console.log("Email sent successfully"))
              .catch((error) => {
                // Log friendly error
                console.error(error);
                if(error.response) {
                  // Extract error msg
                  const { message, code, response } = error;
                  // Extract response msg
                  const { headers, body } = response;
                  console.error(body);
                }
              });
              res.send({
                success: true,
                message: "Transaction Completed: ",
                transactionCreated,
                sender: accUpd[0],
                receiver: accUpd[1],
              });
            })
            .catch((err) =>
              res.status(400).send({
                success: false,
                message: "Something went wrong: ",
                err,
              })
            );
        })
      : res
          .status(400)
          .send({ success: false, message: "insufficient funds" });
  });
});
/////////////////
// ROUTES /PUT/
/////////////////

// Route for modifying user's account balance (recharge)

server.put("/transactions/account/recharge/:userId", (req, res, next) => {
  const { userId } = req.params;
  const amount = Number(req.body.amount);
  Account.findOne({ where: { userId } }).then((account) => {
    const currentBalance = account.balance;
    account.balance = Number(currentBalance) + amount;
    account
      .save()
      .then((done) =>
        Transaction.create({
          amount: amount,
          message: "Account balance recharge.",
          state: "complete",
          senderId: 1,
          receiverId: userId,
        })
          .then((transaction) => {
            res.status(200).send({
              success: true,
              message: "Your account balance has been succesffully updated",
              done,
              transaction,
            });
          })
          .catch((err) =>
            res.status(400).send({
              success: false,
              message:
                "There has been an error with your recharge, please reach out our support team",
              err,
            })
          )
      )
      .catch((err) =>
        res.status(400).send({
          success: false,
          message:
            "There has been an error with your recharge, please reach out our support team",
          err,
        })
      );
  });
});

/////////////////
// ROUTES /PATCH/
/////////////////

// Route for changing the state of a transaction
server.patch("/transactions/:id/inProcess", (req, res, next) => {
  Transaction.findByPk(req.params.id) // let's find if the transaction exists
    .then((transaction) => {
      Account.findByPk(transaction.sender) // Search for the account that sends the money
        .then((account) => {
          res.send({ success: true, message: "response: ", account })(
            Number(account.balance) >= transaction.amount
          ) // It verifies that has sufficient funds
            ? account
                .update({
                  balance: Number(account.balance) - transaction.amount,
                }) // takes away the money from his account
                .then((accUpdated) => {
                  transaction
                    .update({ state: "inProcess" })
                    .then((transaction) =>
                      res.send({
                        success: true,
                        message: "Transaction inProcess : ",
                        transaction,
                        accUpdated,
                      })
                    );
                })
            : res
                .status(400)
                .send({ success: false, message: "insufficient funds" });
        });
    })
    .catch((err) =>
      res
        .status(400)
        .send({ success: false, message: "Something went wrong: ", err })
    );
});

// Route for patching the amount of money of an account a.k.a 'illicit enrichment'
server.patch("/transactions/enrich/:userId", (req, res, next) => {
  Account.findOne({ where: { userId: req.params.userId } })
    .then((account) => {
      account
        ? account
            .update({ balance: Number(account.balance) + req.body.amount })
            .then((enrichedAccount) =>
              res.send({
                success: true,
                message: "Enriched Account: ",
                enrichedAccount,
              })
            )
            .catch((err) =>
              res.status(400).send({
                success: false,
                message: "Something went wrong: ",
                err,
              })
            )
        : res.send({ success: false, message: "User not found" });
    })
    .catch((err) =>
      res
        .status(400)
        .send({ success: false, message: "Something went wrong: ", err })
    );
});

server.listen(3003, () => {
  console.log("Transaction service running on 3003");
});

module.exports = server;
