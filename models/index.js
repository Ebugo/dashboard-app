'use strict';

var fs        = require('fs');
var path      = require('path');
var { Sequelize, DataTypes } = require('sequelize');
var basename  = path.basename(__filename);
const config = require('../config/keys');
var db        = {};

const sequelize = new Sequelize(config.dbURI)

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    // var model = sequelize['import'](path.join(__dirname, file));
    var model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
