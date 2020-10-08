const express = require("express");
const { User } = require("../db.js");
const server = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

////////////////
// MIDDLEWARES /
////////////////
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev")); // Intializing console logger middleware for HTTP requests.

server.get('/register', function (req, res) {
  res.render('Register');
});

server.post('/register', async function (req, res) {
const { name, email, token } = req.body.user;
const hots = req.headers.host;

    const msg = {
        from: 'bankhenry7@gmail.com',
        to: email,
        subject: 'Henry Bank - Verify email',
        text: `
            Hello ${name}, thanks for registering on our site.
            Please copy and paste the address below to verify your account.
            http://${host}/verify-email?token=${token}
        `,
        html: `
            <h1>Hello ${name},</h1>
            <p>Thanks for registering on our site.</p>
            <a href="http://${host}/verify-email?token=${token}">Verify your account</a>
        `
    }
    try {
        await sgMail.send(msg);
        console.log('Email sent');
        // res.send({
        //     success: true,
        //     message: `Thanks for registering. Please check your email to verify your account.`,
        // });
    } catch (error) {
        console.log(error);
        // res.send({
        //     success: false,
        //     message: `Something went wrong. Please contact us for assistance.`,
        // });
    }
});
///////////////
// ROUTES
///////////////


// // Route for posting a new user to db
// server.post("/register/create", (req, res, next) => {
//   const { email, password, passcode, docType, docNumber, name, surname, birth, phone, street, street_number, locality, state, country, role } = req.body;
//   const emailToken = crypto.randomBytes(64).toString('hex');
//   sendgrid.register(name, email, emailToken, req.headers.host)
//   User.create({
//     email, role, password, passcode, docType, docNumber, name, surname, birth, phone, street, street_number,
//     locality, state, country, emailToken
//   }).then(user => {
//     res.status(200).send(user)
//   }).catch(err => res.send(err))
// });

server.listen(3002, () => {
  console.log("Register service running on 3002");
});

module.exports = server;