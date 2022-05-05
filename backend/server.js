const express = require("express");
const app = express();
const cors = require("cors");
const helmet =  require('helmet')

app.use(helmet())
app.use(cors());
app.use(express.json());

const userRoute = require("./routes/User");
app.use("/user", userRoute);
const postRoute = require("./routes/Post");
app.use("/post", postRoute);

app.listen(8000, (req, res) => {
  console.log("Server running...");
});