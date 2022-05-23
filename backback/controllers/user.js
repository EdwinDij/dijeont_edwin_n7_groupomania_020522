const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const db = require('../config/db');
const saltRounds = 10

exports.register = (req, res,) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  //console.log(req.body)
  bcrypt.hash(password, saltRounds)
    .then(hash => {
      const newUser = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hash,
      }

      db.query(
        "INSERT INTO users (lastname, firstname, email ,password ) VALUES (?, ?, ?, ?);",
        [newUser.lastname, newUser.firstname, newUser.email, newUser.password], function (err, result) {
          if (err) throw err;
          res.status(201).json({ message: `Utilisateur ${newUser.firstname} ajouté` });
        })
    })
    .catch(error => res.status(500).json({ error }));
}

exports.login = (req, res) => {
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
          } else {
            return res.status(401).json({ msg: 'Username or password is incorrect!' });
          }
        }
      );
    }
  );
};

exports.delete = (req, res) => {
  const request = req.body;
  const toDelete = {
    id: request.id
  }


 db.query("DELETE FROM users WHERE id = ?",
    [toDelete.id],
    (err, results) => {
      console.log(err);
      res.send(results)
    }
  )
}