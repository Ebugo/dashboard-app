const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const models = require('./models');
require('./services/passport');

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

models.sequelize.sync()
  .then(() => {
    app.listen(PORT);
    console.log(`Server listening to port ${PORT}`)
  });
