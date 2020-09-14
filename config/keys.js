// keys.js - figure out what set of credentias to return
if (process.env.NODE_ENV === 'production') {
  // in productin, return prod keys
  module.exports = require('./prod');
} else {
  // in dev, return dev keys
  module.exports = require('./dev');
}