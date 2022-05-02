"use strict";
const {Model} = require ("Sequelize")

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    static associate (models) {
      models.Users.hasMany(models.post)
      models.Users.hasMany(models.comment)
    }
  }
  User.init ({
    lastname : DataTypes.STRING,
    firstname : DataTypes.STRING,
    email : DataTypes.STRING,
    password : DataTypes.STRING,
    avatar : DataTypes.STRING,
    role : DataTypes.STRING,
  },
  {
    sequelize, 
    modelName:"Usera"
  });
  return User
}