const db = require("../config/db")

exports.getPosts = (req, res, next) => {
    db.query("SELECT * FROM posts", (err, results) => {
        if (err) {
          console.log(err);
        }
        res.send(results);
      });
    }
