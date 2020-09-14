const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(e) {
    console.log(e);
  }
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id })
    .then(existingUser => {
      if (existingUser) {
        // user exists already
        done(null, existingUser);
      } else {
        new User({ googleId: profile.id }).save()
          .then(user => {
            done(null, user);
          })
          .catch(e => {
            console.log(e);
          })
      }
    })
    .catch(e => {
      console.log(e);
    });
  }
));
