'use strict';
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstname: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    fullname: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstname} ${this.lastname}`;
      },
      set(value) {
        throw new Error('Not allowed!');
      }
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: true,
      validate: {
        len: [3, 50] // must be between 3 and 50.
      }
    },
    googleId: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_login: {
      type: DataTypes.DATE
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female'),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: [11, 14] // must be between 11 and 14.
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'active', 'inactive'),
      defaultValue: 'pending'
    },
    role: {
      type: DataTypes.ENUM('User', 'Admin'),
      defaultValue: 'User'
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'https://bringforthjoy.s3.us-east-2.amazonaws.com/home/TraineesFolder/avatar/default.jpg'
    }
  });

  User.associate = function (models) {
  }

  return User;
}
