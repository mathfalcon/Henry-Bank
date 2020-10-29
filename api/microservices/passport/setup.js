const { User, Account,Card } = require("../db.js");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({where:{id}, include:{model: Account, as: 'account', include: Card}, attributes: { exclude: ['photo'] }})
    .then((user) => done(null, user))
    .catch((err) => {
      if (err) {
        return done(err);
      }
    });
});

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({ where: { email: email } })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "The provided email does not exist!",
            });
          }
          if (!user.checkPassword(password)) {
            return done(null, false, {
              message: "Incorrect password",
            });
          }
          return done(null, user);
        })
        .catch((err) => {
          if (err) {
            return done(err);
          }
        });
    }
  )
);

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID:
//         "958019176203-negf5quivisfv6npk0almm4hcsunn6fb.apps.googleusercontent.com",
//       clientSecret: "e6qOgfX7fTuXiUyU3wJu53w7",
//       callbackURL: "http://localhost:3100/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       console.log(profile._json.email)
//       User.findOrCreate({ 
//         where: {email: profile._json.email},
//         defaults: {
//           name: profile.displayName,
//           username: 'Google User',
//           email: profile._json.email,
//           role: 'client'
//         }
//       }).then(user => {
//         return done(null, user[0].dataValues)
//       }).catch(err => done(err))
//     }
//   )
// );

module.exports = passport;
