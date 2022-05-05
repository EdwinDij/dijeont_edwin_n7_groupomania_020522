const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require ("bcrypt");
const saltRounds = 10;


router.post("/register", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  var password = req.body.password;

    bcrypt.hash (password, saltRounds, (err, hash) =>{
      if(err) throw err;
      password = hash;
      db.query(
        "INSERT INTO users (lastname, firstname, email ,password ) VALUES (?, ?, ?, ?);",
        [lastname, firstname, email, password],
        (err, results) => {
          console.log(err);
          res.send(results);
        }
      )
    })
  })

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
            message: "Erreur mail/mot de passe!",
          });
        }
      } else {
        res.json({ loggedIn: false, message: "Utilisateur inconnue" });
      }
    }
  );
});


module.exports = router;