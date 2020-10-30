const express = require("express");
const { Account, Transaction, User } = require("../db.js");
const server = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
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
server.get("/transactions/user/:userId", (req, res, next) => {
  const { userId } = req.params;
  Transaction.findAll({
    where: {
      [Op.or]: {
        receiverId: userId,
        senderId: userId,
      },
    },
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
    order: [["createdAt", "DESC"]],
  })
    .then((transactions) => {
      res.send({ success: true, message: "transactions list: ", transactions });
    })
    .catch((err) => {
      res
        .status(400)
        .send({ success: false, message: "Something went wrong: ", err });
    });
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
server.post("/transactions/historyByDate", (req, res, next) => {
  const { userId, dateFrom, dateTo } = req.body;

  Promise.all([
    Transaction.findAll({
      where: {
        createdAt: { [Op.between]: [dateFrom, dateTo] },
        senderId: userId,
      },
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
      order: [["createdAt", "DESC"]],
    }),
    Transaction.findAll({
      where: {
        createdAt: { [Op.between]: [dateFrom, dateTo] },
        receiverId: userId,
      },
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
      order: [["createdAt", "DESC"]],
    }),
    Transaction.findAll({
      where: {
        createdAt: { [Op.between]: [dateFrom, dateTo] },
        [Op.or]: { senderId: userId, receiverId: userId },
      },
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
      order: [["createdAt", "DESC"]],
    }),
  ])
    .then((transactions) => {
      let outcomes = transactions[0].reduce(
        (total, trans) =>
          trans.state === "complete" ? total + Number(trans.amount) : total,
        0
      );
      let incomes = transactions[1].reduce(
        (total, trans) =>
          trans.state === "complete" ? total + Number(trans.amount) : total,
        0
      );
      let total = incomes - outcomes;
      res.send({ transactions: transactions[2] });
    })
    .catch((err) =>
      res
        .status(400)
        .send({ success: false, message: "Something went wrong: ", err })
    );
});
// Route to get the balance in the last 7 days
server.get("/transactions/history/weekly/:userId", (req, res, next) => {
  const today = new Date(Date.now());
  const refe = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
  );
  const day1 = new Date(refe - 1000 * 60 * 60 * 24 * 6).toISOString();
  const day2 = new Date(refe - 1000 * 60 * 60 * 24 * 5).toISOString();
  const day3 = new Date(refe - 1000 * 60 * 60 * 24 * 4).toISOString();
  const day4 = new Date(refe - 1000 * 60 * 60 * 24 * 3).toISOString();
  const day5 = new Date(refe - 1000 * 60 * 60 * 24 * 2).toISOString();
  const day6 = new Date(refe - 1000 * 60 * 60 * 24 * 1).toISOString();
  const day7 = refe.toISOString();
  const todayDate = today.toISOString();

  Promise.all([
    Transaction.findAll({
      where: {
        createdAt: { [Op.lt]: day1 },
        senderId: req.params.userId,
      },
    }),
    Transaction.findAll({
      where: {
        createdAt: { [Op.lt]: day1 },
        receiverId: req.params.userId,
      },
    }), // Balance record
    Transaction.findAll({
      where: {
        createdAt: { [Op.between]: [day1, day2] },
        senderId: req.params.userId,
      },
    }),
    Transaction.findAll({
      where: {
        createdAt: { [Op.between]: [day1, day2] },
        receiverId: req.params.userId,
      },
    }), // Balance day 1
    Transaction.findAll({
      where: {
        createdAt: { [Op.between]: [day2, day3] },
        senderId: req.params.userId,
      },
    }),
    Transaction.findAll({
      where: {
        createdAt: { [Op.between]: [day2, day3] },
        receiverId: req.params.userId,
      },
    }), // Balance day 2
    Transaction.findAll({
      where: {
        createdAt: { [Op.between]: [day3, day4] },
        senderId: req.params.userId,
      },
    }),
    Transaction.findAll({
      where: {
        createdAt: { [Op.between]: [day3, day4] },
        receiverId: req.params.userId,
      },
    }), // Balance day 3
    Transaction.findAll({
      where: {
        createdAt: { [Op.between]: [day4, day5] },
        senderId: req.params.userId,
      },
    }),
    Transaction.findAll({
      where: {
        createdAt: { [Op.between]: [day4, day5] },
        receiverId: req.params.userId,
      },
    }), // Balance day 4
    Transaction.findAll({
      where: {
        createdAt: { [Op.between]: [day5, day6] },
        senderId: req.params.userId,
      },
    }),
    Transaction.findAll({
      where: {
        createdAt: { [Op.between]: [day5, day6] },
        receiverId: req.params.userId,
      },
    }), // Balance day 5
    Transaction.findAll({
      where: {
        createdAt: { [Op.between]: [day6, day7] },
        senderId: req.params.userId,
      },
    }),
    Transaction.findAll({
      where: {
        createdAt: { [Op.between]: [day6, day7] },
        receiverId: req.params.userId,
      },
    }), // Balance day 6
    Transaction.findAll({
      where: {
        createdAt: { [Op.between]: [day7, todayDate] },
        senderId: req.params.userId,
      },
    }),
    Transaction.findAll({
      where: {
        createdAt: { [Op.between]: [day7, todayDate] },
        receiverId: req.params.userId,
      },
    }), // Balance day 7
  ])
    .then((transactions) => {
      let balances = [];
      let balance = 0;
      for (let i = 0; i < transactions.length; i = i + 2) {
        let outcomes = transactions[i].reduce((total, trans) => 
          trans.state === "complete" ? total + Number(trans.amount) : total, 0);
        let incomes = transactions[i + 1].reduce((total, trans) =>
          trans.state === "complete" ? total + Number(trans.amount) : total, 0);
        let total = incomes - outcomes;
        balance = balance + total;
        balances.push(balance);
      }

      let outcomesRecord = transactions[0].reduce(
        (total, trans) =>
          trans.state === "complete" ? total + Number(trans.amount) : total,
        0
      );
      let incomesRecord = transactions[1].reduce(
        (total, trans) =>
          trans.state === "complete" ? total + Number(trans.amount) : total,
        0
      );
      let balanceRecord = incomesRecord - outcomesRecord;

      let outcomes1 = transactions[2].reduce(
        (total, trans) =>
          trans.state === "complete" ? total + Number(trans.amount) : total,
        0
      );
      let incomes1 = transactions[3].reduce(
        (total, trans) =>
          trans.state === "complete" ? total + Number(trans.amount) : total,
        0
      );
      let total1 = incomes1 - outcomes1;
      let balance1 = balanceRecord + total1;

      let outcomes2 = transactions[4].reduce(
        (total, trans) =>
          trans.state === "complete" ? total + Number(trans.amount) : total,
        0
      );
      let incomes2 = transactions[5].reduce(
        (total, trans) =>
          trans.state === "complete" ? total + Number(trans.amount) : total,
        0
      );
      let total2 = incomes2 - outcomes2;
      let balance2 = balance1 + total2;

      let outcomes3 = transactions[6].reduce(
        (total, trans) =>
          trans.state === "complete" ? total + Number(trans.amount) : total,
        0
      );
      let incomes3 = transactions[7].reduce(
        (total, trans) =>
          trans.state === "complete" ? total + Number(trans.amount) : total,
        0
      );
      let total3 = incomes3 - outcomes3;
      let balance3 = balance2 + total3;

      let outcomes4 = transactions[8].reduce(
        (total, trans) =>
          trans.state === "complete" ? total + Number(trans.amount) : total,
        0
      );
      let incomes4 = transactions[9].reduce(
        (total, trans) =>
          trans.state === "complete" ? total + Number(trans.amount) : total,
        0
      );
      let total4 = incomes4 - outcomes4;
      let balance4 = balance3 + total4;

      let outcomes5 = transactions[10].reduce(
        (total, trans) =>
          trans.state === "complete" ? total + Number(trans.amount) : total,
        0
      );
      let incomes5 = transactions[11].reduce(
        (total, trans) =>
          trans.state === "complete" ? total + Number(trans.amount) : total,
        0
      );
      let total5 = incomes5 - outcomes5;
      let balance5 = balance4 + total5;

      let outcomes6 = transactions[12].reduce(
        (total, trans) =>
          trans.state === "complete" ? total + Number(trans.amount) : total,
        0
      );
      let incomes6 = transactions[13].reduce(
        (total, trans) =>
          trans.state === "complete" ? total + Number(trans.amount) : total,
        0
      );
      let total6 = incomes6 - outcomes6;
      let balance6 = balance5 + total6;

      let outcomes7 = transactions[14].reduce(
        (total, trans) =>
          trans.state === "complete" ? total + Number(trans.amount) : total,
        0
      );
      let incomes7 = transactions[15].reduce(
        (total, trans) =>
          trans.state === "complete" ? total + Number(trans.amount) : total,
        0
      );
      let total7 = incomes7 - outcomes7;
      let balance7 = balance6 + total7;

      res.send([
        balanceRecord,
        balance1,
        balance2,
        balance3,
        balance4,
        balance5,
        balance6,
        balance7,
        balances,
      ]);
    })
    .catch((err) =>
      res
        .status(400)
        .send({ success: false, message: "Something went wrong: ", err })
    );
});

// Route for getting user transactions from a specific date to present
server.get(
  "/transactions/history/:userId/:startDate/:toDate",
  (req, res, next) => {
    Promise.all([
      Transaction.findAll({
        where: {
          createdAt: {
            [Op.and]: [
              { [Op.gte]: req.params.startDate },
              { [Op.lte]: req.params.toDate },
            ],
          },
          senderId: req.params.userId,
        },
      }),
      Transaction.findAll({
        where: {
          createdAt: {
            [Op.and]: [
              { [Op.gte]: req.params.startDate },
              { [Op.lte]: req.params.toDate },
            ],
          },
          receiverId: req.params.userId,
        },
      }),
    ])
      .then((transactions) => {
        let outcomes = transactions[0].reduce(
          (total, trans) =>
            trans.state === "complete" ? total + trans.amount : total,
          0
        );
        let incomes = transactions[1].reduce(
          (total, trans) =>
            trans.state === "complete" ? total + trans.amount : total,
          0
        );
        let total = incomes - outcomes;
        res.send({ transactions, total });
      })
      .catch((err) =>
        res
          .status(400)
          .send({ success: false, message: "Something went wrong: ", err })
      );
  }
);
// Route to get the balance by month
server.get(
  "/transactions/history/:userId/:startDate/:toDate",
  (req, res, next) => {
    Account.findAll({
      where: {
        updatedAt: {
          [Op.and]: [
            { [Op.gte]: req.params.startDate },
            { [Op.lte]: req.params.toDate },
          ],
        },
        userId: req.params.userId,
      },
      attributes: [
        sequilize.fn("date_trunc", "month", sequilize.col("updatedAt")),
      ],
      group: "month",
      // order: [ [ 'createdAt', 'DESC' ]],
    })
      .then((account) => {
        // Return an array where you can get account.balance by month
        res.send({ account });
      })
      .catch((err) =>
        res.status(400).send({
          success: false,
          message: "Cannot get requiered balances: ",
          err,
        })
      );
  }
);

////////////////
// ROUTES /POST/
////////////////

// Route for posting a 'created' transaction
server.post("/transactions/:sender/to/:receiver", (req, res, next) => {
  const { amount, message, passcode, testFecha } = req.body;

  Promise.all([
    Account.findOne({ where: { userId: req.params.sender } }), // Search for the account that sends the money
    Account.findOne({ where: { userId: req.params.receiver } }), // Search for the account that receives the money
    User.findByPk(req.params.sender),
    User.findByPk(req.params.receiver),
  ])
    .then((acc) => {
      if (!acc[2].checkPasscode(passcode)) {
        res.send({
          success: false,
          message: "The provided actual passcode is incorrect",
        });
      } else {
        Number(acc[0].balance) >= amount // It verifies that has sufficient funds
          ? Promise.all([
              acc[0].update({
                balance: Number(acc[0].balance) - Number(amount),
              }), // extract the money from sender account
              acc[1].update({
                balance: Number(acc[1].balance) + Number(amount),
              }), // deposit the money into receiver account
            ]).then((accUpd) => {
              Transaction.create({
                senderId: req.params.sender,
                receiverId: req.params.receiver,
                amount,
                message,
                state: "complete",
                senderBalance: acc[0].balance,
                receiverBalance: acc[1].balance,
                createdAt: testFecha,
              })
                .then((transactionCreated) => {
                  const msg = {
                    template_id: process.env.SENGRID_TEMPLATE_ID_TRANSACTION,
                    from: {
                      email: process.env.SENDGRID_SENDER_EMAIL,
                      name: process.env.SENDGRID_SENDER_NAME,
                    },
                    personalizations: [
                      {
                        to: [
                          {
                            email: acc[3].email,
                          },
                          {
                            email: acc[2].email,
                          },
                        ],
                        dynamic_template_data: {
                          senderAcc: acc[0].cvu,
                          receiverAcc: acc[1].cvu,
                          senderName: `${acc[2].name} ${acc[2].surname}`,
                          receiverName: `${acc[3].name} ${acc[3].surname}`,
                          amount: `${req.body.amount} ${acc[0].type}`,
                          message: req.body.message,
                        },
                      },
                    ],
                  };
                  sgMail
                    .send(msg)
                    .then((data) => console.log("Email sent successfully"))
                    .catch((error) => {
                      // Log friendly error
                      console.error(error);

                      if (error.response) {
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
      }
    })
    .catch((err) => console.log(err));
});

/////////////////
// ROUTES /PUT/
/////////////////

// Route for modifying user's account balance (recharge)

server.put("/transactions/account/recharge/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const amount = Number(req.body.amount);
  const bankUser = await User.findOne({
    where: { email: "bankhenry@recharges.com" },
  });

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
          senderId: bankUser.id,
          receiverId: userId,
          createdAt: req.body.testFecha
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

// TESTING
// TESTING
// TESTING
// TESTING
// TESTING
server.post("/transactions/testing", (req, res, next) => {
  const { amount, message, state, senderId, receiverId, createdAt } = req.body;
  Transaction.create({
    amount,
    message,
    state,
    senderId,
    receiverId,
    createdAt,
  }).then((data) => res.send(data));
});

// Route for getting the transactions by time range of an user
server.post("/transactions/account/graph/byTime", (req, res, next) => {
  const { userId, sortBy } = req.body;
  console.log(req.body)
  let today = new Date();
  let startDate = new Date();

  if (sortBy === "month") {
    startDate.setMonth(today.getMonth() - 1);
  } else if (sortBy === "year") {
    startDate.setFullYear(today.getFullYear() - 1);
  }
  Transaction.findAll({
    where: {
      [Op.or]: [{ receiverId: userId }, { senderId: userId }],
      state: "complete",
      createdAt: {
        [Op.gt]: new Date(startDate),
        [Op.lt]: new Date(today),
      },
    },
    order: [["createdAt", "DESC"]],
  }).then((transactions) => {
    let obj = {};
    if (sortBy === "month") {
      transactions.forEach((transaction) => {
        let getDay = new Date(transaction.createdAt).getDate();
        if (obj.hasOwnProperty(getDay)) {
          obj[getDay].push(transaction);
        } else {
          obj[getDay] = [transaction];
        }
      });
      let toReturn = {};

      for (let key in obj) {
        toReturn[key] =
          userId == obj[key][0].senderId
            ? obj[key][0].senderBalance
            : obj[key][0].receiverBalance;
      }
      return res.send(toReturn);
    } else if (sortBy === "year") {
      transactions.forEach((transaction) => {
        let getMonth = new Date(transaction.createdAt).getMonth() + 1;
        if (obj.hasOwnProperty(getMonth)) {
          obj[getMonth].push(transaction);
        } else {
          obj[getMonth] = [transaction];
        }
      });

      let toReturn = {};
      
      for (let key in obj) {
        toReturn[key] =
          userId == obj[key][0].senderId
            ? obj[key][0].senderBalance
            : obj[key][0].receiverBalance;
      }
      return res.send(toReturn);
    }
  });
});

server.listen(3003, () => {
  console.log("Transaction service running on 3003");
});

module.exports = server;
