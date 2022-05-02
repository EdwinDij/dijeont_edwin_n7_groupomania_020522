/*const { TIMESTAMP } = require("mysql/lib/protocol/constants/types")
const {Model, TINYINT} = require("sequelize")
module.exports = (sequelize, DataTypes) => {

  const comments = sequelize.define(
    "comments",
    {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      content: {
          type: DataTypes.STRING,
          allowNull: false
      },
      users_id: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      post_id: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      comment_date: {
        type:DataTypes.INTEGER,
        allowNull: false,
        Date: TIMESTAMP
      },
      like:{
        type: DataTypes.STRING
      }
    },

    {
      sequelize,
      modelName: "comments",
    }
  )
  return comments
}*/