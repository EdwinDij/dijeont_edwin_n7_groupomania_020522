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

router.post('/login', (req, res,) => {
  const email = req.body.email
  const password = req.body.password

  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        return res.status(400).json({
          msg: 'err'
        });
      }
      if (!result.length) {
        return res.status(401).json({
          msg: 'Email or password is incorrect!'
        });
      }
      // check password
      bcrypt.compare(
        password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {

            return res.status(401).json({
              msg: 'Email or password is incorrect!'
            });
          }
          if (bResult) {
            const token = jwt.sign({ id: result[0].id }, 'SECRET_TOKEN', { expiresIn: '24h' });
            return res.status(200).json({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          } else{
            return res.status(401).json ({ msg: 'Username or password is incorrect!'});
          }
        }
      );
    }
  );
});

router.post('/deleteUser', (req, res) =>{
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const admin = req.query.isAdmin
  const dbFirstname = db.query(`SELECT * FROM users WHERE firstname = ${db.escape(firstname)};`)
  const dbLastname = db.query (`SELECT * FROM users WHERE lastname = ${db.escape(lastname)};`)
  const isAdmin = db.query (`SELECT * FROM users WHERE isAdmin = ${db.escape(lastname)};`)

  if (firstname === dbFirstname && lastname === dbLastname || admin === isAdmin){
    db.query(`DELETE FROM users WHERE WHERE id=?`)
    return res.status(200).json ({msg: "compte supprimé"})
  } else {
    return res.status(400).json({ msg: "Vous n'avez pas les droits de suppression"})
  }
 
})

module.exports = router;