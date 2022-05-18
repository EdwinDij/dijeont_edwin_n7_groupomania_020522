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

router.post('/comment', (req, res) => {
  const content = req.body.comment;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  db.query(
    "INSERT INTO comments ( lastname, firstname, content) VALUES (?, ?, ?);",
     [lastname, firstname, content],
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

router.post('deletePost', (req, res) => {
  const request = req.body;
  const toDelete = { id: request.id }

  db.query("DELETE FROM posts where id = ? ",
    [toDelete.id],
    (err, results) => {
      if (err) {
        return res.status(400).json({
          msg: 'err'
        });
      } else {
        return res.send(results)
      }
    }
  )
})


module.exports = router;