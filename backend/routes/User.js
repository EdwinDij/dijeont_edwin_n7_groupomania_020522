const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken')

router.post("/register", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  var password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;
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
        bcrypt.compare(password, results[0].password, (err, data) => {
          //if error than throw error
          if (err) throw err

          //if both match than you can do anything
          if (data) {
            return res.status(200).json({ msg: "Login success" })
          } else {
            return res.status(401).json({ msg: "Invalid credencial" })
          }

        })
      } else {
        return res.status(401).json ({msg:"invalid user"})
      }
      if (results) {
        const token = jwt.sign ({id:results[0].id}, 'SECRET_TOKEN',{ expiressIn: '24h'})
        db.query("UPDATE users SET last_login = now() WHERE id = `${results[0].id}`")
        return res.status(200).send ({
          msg: 'Logged in !',
          token,
          user: results[0]
        })
      }
      return res.status(401).send({
        msg: 'email or password is incorrect!'
      })
    })
  })


  module.exports = router;