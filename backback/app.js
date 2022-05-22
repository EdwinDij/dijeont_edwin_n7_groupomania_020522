const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/user')
const postRoutes = require ('./routes/post')
require('dotenv').config()

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET route to handle the request coming from user
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Hello from the express server"
    });
});


app.use('/images/', express.static(path.join(__dirname, 'images')));
app.use('/auth', userRoutes);
app.use('/post', postRoutes);

module.exports = app;