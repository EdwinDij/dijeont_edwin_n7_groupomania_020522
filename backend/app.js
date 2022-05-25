const express = require("express");
require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const db = require("./models");
const path = require("path");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const likeRoutes = require("./routes/like");
const commentRoutes = require("./routes/comment");

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.urlencoded({ extended: true }));

//TRANSFORMER LE CORPS DE LA REQUÉTE EN json
app.use(express.json());

//MODULE DE SÉCURITÉ D'EN-TÊTE HTTP
app.use(helmet());

//CONNEXION A LA BASE DE DONNÉ SQL
db.sequelize.sync();

const dbTestConnexion = async function () {
  try {
    await db.sequelize.authenticate();
    console.log(" connection succes!!!!!!!!!!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
dbTestConnexion();

//DIFFERENTES ROUTES

// IMAGE
app.use("/images", express.static(path.join(__dirname, "images")));

// USER
app.use("/api/user", userRoutes);

// POST
app.use("/api/post", postRoutes);

// LIKE
app.use("/api/like", likeRoutes);

// COMMENT
app.use("/api/comment", commentRoutes);

module.exports = app;
