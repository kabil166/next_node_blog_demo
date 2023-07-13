const {DataTypes, Sequelize} = require('sequelize');

const dbConfig = require('../db')

const sequelize = new Sequelize(dbConfig.development);

const User = sequelize.define('User', {
    // Define the properties of the User model
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
      },
    state: {
        type: DataTypes.STRING,
        allowNull: false
        },
    city: {
        type: DataTypes.STRING,
        allowNull: false
        },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

User.sync();

module.exports = User;