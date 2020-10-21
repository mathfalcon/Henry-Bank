const express = require("express");
const { User, Account, Card } = require("../db.js");
const server = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const crypto = require("crypto");
const path = require("path");
const moment = require("moment")

////////////////
// FUNCTIONS ///
////////////////
function genCC(cc = String(Math.floor(Math.random() * (9 - 1)) + 1), n = 16,) {
  while (cc.length < n) cc += Math.floor(Math.random() * 9)
  return cc;
}

////////////////
// MIDDLEWARES /
////////////////
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev")); // Intializing console logger middleware for HTTP requests.
// view engine setup
server.set("views", path.join(__dirname, "../views"));
server.set("view engine", "ejs");
// render HTML files
server.engine("html", require("ejs").renderFile);

///////////////
// ROUTES /GET/
///////////////

// Route for getting all users
server.get("/users", (req, res, next) => {
  User.findAll({ include: [{ model: Account }] })
    .then((users) => {
      res.send({ success: true, message: "Users list: ", users });
    })
    .catch((err) =>
      res
        .status(400)
        .send({ success: false, message: "Something went wrong: ", err })
    );
});
// Route for getting a specific users
server.get("/users/:id", (req, res, next) => {
  User.findByPk(req.params.id, { include: [{ model: Account }] })
    .then((user) => {
      user
        ? res.send({ success: true, message: "User: ", user })
        : res.send({ success: false, message: "User not found" });
    })
    .catch((err) =>
      res
        .status(400)
        .send({ success: false, message: "Something went wrong: ", err })
    );
});
//Email verification route
server.get("/users/verification/verify-email", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { emailToken: req.query.token } });
    if (!user) {
      res.render("errorToken.html");
      return res.redirect("/");
    }
    user.emailToken = null;
    user.isVerified = true;
    await user.save();
    res.render("emailVerification.html", { name: user.name });
  } catch (error) {
    console.log(error);
    res.render("error.html");
    res.redirect("/");
  }
});

////////////////
// ROUTES /POST/
////////////////

// Route for posting a new user
server.post("/users/create", (req, res, next) => {
  const {
    email,
    password,
    passcode,
    docType,
    docNumber,
    name,
    surname,
    birth,
    phone,
    street,
    streetNumber,
    locality,
    state,
    country,
    role,
  } = req.body;
  const emailToken = crypto.randomBytes(64).toString("hex");
  User.create({
    email,
    password,
    passcode,
    docType,
    docNumber,
    name,
    surname,
    birth,
    phone,
    street,
    streetNumber,
    locality,
    state,
    country,
    role,
    emailToken,
  })
    .then((userCreated) => {
      const msg = {
        "template_id": process.env.SENDGRID_TEMPLATE_ID,
        "from": {
          "email": process.env.SENDGRID_SENDER_EMAIL,
          "name": process.env.SENDGRID_SENDER_NAME,
        },
        "personalizations": [
          {
            "to": [
              {
                "email": userCreated.email,
              },
            ],
            "dynamic_template_data": {
              "host": req.headers.host,
              "token": userCreated.emailToken,
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
      Account.create({ userId: userCreated.id })
        .then((accCreated) =>
          Card.create({ accountId: accCreated.id, number: genCC(), cvv: genCC("", 3), expiration_date:moment().add(3, 'years').calendar() })
            .then((cardCreated) =>
              res.send({
                success: true,
                message:
                  "Thanks for registering. Please check your email to verify your account.",
                userCreated,
                cardCreated,
                accCreated
              })
            )
            .catch((err) => {
              console.log(err);
              res.send({
                success: false,
                message: "Something went wrong in card creation. Please contact us for assistance.",
                err,
              });
            })
        )
        .catch((err) => {
          console.log(err);
          res.send({
            success: false,
            message: "Something went wrong in account creation. Please contact us for assistance.",
            err,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        success: false,
        message: "Something went wrong in user creation. Please contact us for assistance.",
        err,
      });
    });
});

///////////////
// ROUTES /PUT/
///////////////

// Route for updating an user information
server.put("/users/update/:id", (req, res, next) => {
  const {
    email,
    password,
    passcode,
    docType,
    docNumber,
    name,
    surname,
    birth,
    phone,
    street,
    streetNumber,
    locality,
    state,
    country,
    role,
  } = req.body;
  User.findByPk(req.params.id)
    .then((user) => {
      user.update({
        email,
        password,
        passcode,
        docType,
        docNumber,
        name,
        surname,
        birth,
        phone,
        street,
        streetNumber,
        locality,
        state,
        country,
        role,
      });
    })
    .then((updatedUser) =>
      res.send({ success: true, message: "Updated User: ", updatedUser })
    )
    .catch((err) =>
      res
        .status(400)
        .send({ success: false, message: "Something went wrong: ", err })
    );
});

// Reset password
server.put("/users/reset_password", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { resetToken: req.query.token } });
    if (!user) {
      res.send({
        success: false,
        message: "Token is invalid. Please contact us for assistance.",
      });
      return res.redirect("/");
    }
    user.password = req.body.password;
    user.resetToken = null;
    await user.save();
    res.send({
      success: true,
      message: `${user.name}, your password has been changed successfully`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Something went wrong. Please contact us for assistance.",
      error,
    });
    res.redirect("/");
  }
});

/////////////////
// ROUTES /PATCH/
/////////////////

// Route to promote the user role to admin
server.patch("/users/promote/:id", (req, res, next) => {
  User.findByPk(req.params.id)
    .then((user) => {
      user.update({ role: "admin" });
    })
    .then((promotedUser) =>
      res.send({ success: true, message: "Promoted User: ", promotedUser })
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

// Route to delete an user
server.delete("/users/:id", (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then((deletedRecord) => {
      if (deletedRecord === 1)
        res.send({ success: true, message: "User Deleted" });
      else res.status(400).send({ success: false, message: "User not found" });
    })
    .catch((err) =>
      res
        .status(400)
        .send({ success: false, message: "Something went wrong: ", err })
    );
});

server.listen(3000, () => {
  console.log("User service running on 3000");
});

module.exports = server;
