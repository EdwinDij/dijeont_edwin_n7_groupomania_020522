const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.post("/", (req, res) => {
 
  const content = req.body.content;
  const image = req.body.image;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  
  db.query(
    "INSERT INTO posts ( content, image_path, firstname, lastname) VALUES (?, ?, ?, ?);",
    [content, image, firstname, lastname],
    (err, results) => {
      console.log(err);
      res.send(results);
    }
  );
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});

router.get("/byUser/:username", (req, res) => {
  const userName = req.params.username;
  db.query(
    "SELECT * FROM Uploads WHERE author = ?;",
    userName,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    }
  );
});

 
module.exports = router;