/*"use strict";
const {Model} = require ("Sequelize")
const { TIMESTAMP } = require("mysql/lib/protocol/constants/types")

module.exports = (sequelize, DataTypes) => {

  class posts extends Model {
    static associate (models) {
      models.Posts.hasMany(models.User)
      models.Posts.hasMany(models.comments)
    }
  }
  posts.init ({
    id: DataTypes.INTEGER,
    content : DataTypes.STRING,
    users_id : DataTypes.INTEGER,
    posts_date : DataTypes.INTEGER,Date: TIMESTAMP,
  },
  {
    sequelize, 
    modelName:"posts"
  });
  return posts
}*/