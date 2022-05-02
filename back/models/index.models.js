const dbConfig = require("../config/db.config");
require("dotenv").config
const {Sequelize, DataTypes} = require("sequelize");

// Configuration sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
})


const db = {}

db.Sequelize = sequelize

// routes models
db.users = require("./users.models")(sequelize, DataTypes)
/*db.posts = require("./posts.models")(sequelize, DataTypes)
db.comments = require ("./comments.models")(sequelize, DataTypes)*/


module.exports = db