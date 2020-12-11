const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const models = require('../models');
const keys = require('../config/keys');
const bCrypt = require('bcrypt-nodejs');

function generateHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8));
};

const User = models.User;

passport.serializeUser((user, done) => {
  // console.log(user, 'serialize');
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // console.log(id, 'deserialize');
    const user = await User.findOne({ where: { id } });
    done(null, user);
  } catch (e) {
    console.log(e);
  }
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // console.log( profile, 'user data')
    const existingUser = await User.findOne({ where: { googleId: profile.id } });
    const last_login = new Date();

    if (existingUser) {
      // user exists already
      await existingUser.update({ 
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        avatar: profile.photos[0] ? profile.photos[0].value : '',
        last_login
      })
      done(null, existingUser);
    } else {
      try {
        const password = generateHash(profile.emails[0].value + profile.id)

        const user = await User.create({ 
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          googleId: profile.id,
          email: profile.emails[0].value,
          password,
          avatar: profile.photos[0] ? profile.photos[0].value : '',
          last_login
        })
        done(null, user);
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  };
}
));
