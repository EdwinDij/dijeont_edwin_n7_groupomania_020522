const express = require("express");
const app = express();
const cors = require("cors");
const helmet =  require('helmet')

app.use(helmet())
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const userRoute = require("./routes/User");
app.use("/user", userRoute);
const postRoute = require("./routes/Post");
app.use("/post", postRoute);

app.listen(8000, (req, res) => {
  console.log("Server running...");
});