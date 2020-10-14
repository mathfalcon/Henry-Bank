const express = require("express");
const { User, Account } = require("../db.js");
const server = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
//Email verification route
server.get("/verify-email", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { emailToken: req.query.token}  });
    if(!user) {
      res.send({ success: false, message: "Token is invalid. Please contact us for assistance."});
      return res.redirect('/');
    }
    user.emailToken = null;
    user.isVerified = true;
    await user.save();
    res.send({ success: true, message: `Welcome to Henry Bank ${user.name}. Now you can start using your account`});
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Something went wrong. Please contact us for assistance.", error })
    res.redirect('/');
  }
});

//Email verification route
server.get("/users/verification/verify-email", async (req, res, next) => {
  console.log('holaaa')
  try {
    const user = await User.findOne({ where: { emailToken: req.query.token}  });
    if(!user) {
      res.send({ success: false, message: "Token is invalid. Please contact us for assistance."});
      return res.redirect('/');
    }
    user.emailToken = null;
    user.isVerified = true;
    await user.save();
    res.send({ success: true, message: `Welcome to Henry Bank ${user.name}. Now you can start using your account`});
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Something went wrong. Please contact us for assistance.", error })
    res.redirect('/');
  }
});

////////////////
// ROUTES /POST/
////////////////

// Route for posting a new user 
server.post("/users/create", (req, res, next) => {
  const { email, password, passcode, docType, docNumber, name, surname, birth, phone, street, streetNumber, locality, state, country, role } = req.body;
  const emailToken = crypto.randomBytes(64).toString('hex');
  User.create({ email, password, passcode, docType, docNumber, name, surname, birth, phone, street, streetNumber, locality, state, country, role, emailToken })
    .then(userCreated => {
      const msg = {
        from: 'bankhenry7@gmail.com',
        to: userCreated.email,
        subject: 'Henry Bank - Verify email',
        text: `
            Hello ${userCreated.name}, thanks for registering on our virtual Bank.
            Please copy and paste the address below to verify your account.
            http://${req.headers.host}/verify-email?token=${userCreated.emailToken}
        `,
        html: `
            <h1>Hello ${userCreated.name},</h1>
            <p>Thanks for registering on our virtual Bank.</p>
            <a href="http://${req.headers.host}/verify-email?token=${userCreated.emailToken}">Click here to verify your account</a>
        `
      }
      sgMail.send(msg);
      Account.create({ userId: userCreated.id }).then(accCreated => res.send({ success: true, message: "Thanks for registering. Please check your email to verify your account.", userCreated, accCreated}))
      Account.create({ userId: userCreated.id }).then(accCreated => res.send({ success: true, message: "User and Account Created: ", userCreated, accCreated }))
    })
    .catch((err) => {
      console.log(err)
      res.send({ success: false, message: "Something went wrong. Please contact us for assistance.", err })
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