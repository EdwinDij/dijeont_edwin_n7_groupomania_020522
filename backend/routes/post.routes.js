const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.post("/", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const author = req.body.author;

  db.query(
    "INSERT INTO Uploads (title, description, image, author) VALUES (?, ?, ?, ?);",
    [title, description, image, author],
    (err, results) => {
      console.log(err);
      res.send(results);
    }
  );
});
