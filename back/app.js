const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path")
const db = require("./models/index.models");
const auth = require('./middlewares/auth.middlewares')
require('dotenv').config()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

db.Sequelize
.authenticate()
.then(() => {
  console.log("Connecté à la Base de Données")
})
.catch(err => {
  console.log("error" + err)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*app.use("/", (req, res) => {
  res.status(200).json({
      status: "success",
      message: "Hello from the express server"
  });
});
*/
//route files

/*const comments = require('./routes/comments.routes')
const posts = require('./routes/posts.routes')*/
const users = require('./routes/users.routes')


//routes
app.use("/api/auth", users,(req, res) => {
  res.status(200).json({
      status: "success",
      message: "teste du post reussi"
  });
});
/*app.use("/api/comments", comments);
app.use("/api/posts", posts)*/


module.exports = app;