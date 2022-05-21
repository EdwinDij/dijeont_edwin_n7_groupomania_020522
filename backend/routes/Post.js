const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require('multer')

router.post("/", multer, (req, res) => {

  const content = req.body.content;
  const image = `${req.protocol}://${req.get('host')}/images/${req.body.media}`;
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

router.post('/comment', (req, res) => {
  const content = req.body.comment;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const posts = req.body.content

  db.query(
    "INSERT INTO comments ( lastname, firstname, content, posts_id) VALUES (?, ?, ?, ?);",
     [lastname, firstname, content, posts],
    (err, results) => {
      console.log(err);
      res.send(results);
    }
  )
})



router.get("/", (req, res) => {
  db.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});


router.post('/deletePost', (req, res) => {
  const request = req.body;
  const toDelete = { id: request.posts_id };

  db.query("DELETE FROM posts where id = ? ", (err, results) => {
    [toDelete.id],
    (err, results) => {
      console.log(err);
    res.send(results)
  }
})
})


module.exports = router;