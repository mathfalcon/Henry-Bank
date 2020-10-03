const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const expressSession = require("express-session");
const SessionStore = require("express-session-sequelize")(expressSession.Store);
const { conn } = require("../db");
const passport = require("../passport/setup");
const server = express();
const { User } = require("../db.js");

///////////////
// MIDDLEWARES
///////////////
server.name = "auth";
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use(
  cors({
    credentials: true,
    // origin: "http://localhost"
  })
);

//Session store
const sequelizeSessionStore = new SessionStore({
  db: conn,
});

//Express session
server.use(
  expressSession({
    secret: "keep it secret, keep it safe.",
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

//Passport middleware
server.use(passport.initialize());
server.use(passport.session());

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

///////////////
// ROUTES /////
///////////////
server.post("/auth/login", (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local-login", (err, user, info) => {
    if (err) {
      return res.status(200).send({
        success: false,
        message: err.message,
        info,
      });
    }
    if (!user) {
      return res.status(200).send({
        success: false,
        info,
      });
    }
    req.login(user, function (err) {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send({
        success: true,
        message: "Has ingresado satisfactoriamente",
        info,
        user,
      });
    });
  })(req, res, next);
});

server.get("/auth/info", (req, res, next) => {
  console.log(req.session);
  if (req.isAuthenticated()) {
    res.send({
      success: true,
      user: req.user,
    });
  } else {
    res.send({
      success: false,
      user: {
        role: "guest",
      },
      message: "No estas logueado",
    });
  }
});

// Hacer un get a esta ruta, desloguea al usuario
server.get("/auth/logout", (req, res, next) => {
  console.log(req.session.destroy());
  req.logOut();
  // .then((deleted) => {
  //   req.logOut();
  //   res.status(200).send({
  //     message: 'Has salido de tu cuenta satisfactoriamente',
  //     success: true
  //   })
  // })
  // .catch(err => res.status(422).send(err))
});

//   server.get(
//     "/auth/google",
//     passport.authenticate("google", { scope: ["profile", "email"] })
//   );

//   server.get(
//     "/auth/google/callback",
//     passport.authenticate("google", {
//       failureRedirect: "http://localhost:3000/login",
//     }), //cambiar luego
//     function (req, res) {
//       // Successful authentication, redirect home.
//       res.redirect("http://localhost:3000/");
//     }
//   );

// Ruta para cambiar contraseña
server.put("/auth/change-password", (req, res, next) => {
  const { userId, currentPw, newPw } = req.body;

  User.findByPk(userId).then((user) => {
    if (!user.checkPassword(currentPw)) {
      res.send({
        success: false,
        message: "La contraseña actual provista es incorrecta",
      });
    } else if (user.checkPassword(currentPw)) {
      user.password = newPw;
      user.save();
      res.status(200).send({
        success: true,
        message: "La contraseña ha sido actualizada con éxito",
      });
    }
  });
});

server.listen(3001, () => {
  console.log("Auth service running on 3001");
});

module.exports = server;
