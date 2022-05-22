const db = require("../config/db")

exports.getPosts = (req, res, next) => {
    db.query("SELECT * FROM posts", (err, results) => {
        if (err) {
          console.log(err);
        }
        res.send(results);
      });
    }

    exports.createPost = (req, res) => {
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const content = req.body.content;
      const media = `${req.protocol}://${req.get('host')}/images/${req.file}`

      console.log(req.body)
      console.log(req.body.file)
      console.log(req.file)
      db.query(
        `INSERT INTO posts ( content, image_path, firstname, lastname) VALUES(?, ?, ?, ? );`,
        [content, media, firstname, lastname],
        (err, results) => {
          console.log(err);
          res.send(results)
          console.log(media.filename)
        }
      );
    };