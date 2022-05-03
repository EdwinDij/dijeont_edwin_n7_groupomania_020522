const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.post("/register", (req, res) => {

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "INSERT INTO users (firstname, lastname, email ,password ) VALUES (?, ?, ?, ?);",
    [firstname, lastname, email, password],
    (err, results) => {
      console.log(err);
      res.send(results);
    }
  );
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    email,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results.length > 0) {
        if (password == results[0].password) {
          res.json({ loggedIn: true, email: email });
        } else {
          res.json({
            loggedIn: false,
            message: "Wrong email/password combo!",
          });
        }
      } else {
        res.json({ loggedIn: false, message: "User doesn't exist" });
      }
    }
  );
});


module.exports = router;