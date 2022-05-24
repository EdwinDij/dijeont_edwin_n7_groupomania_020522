const db = require("../config/db")

exports.getComment = (req, res) => {
    db.query("SELECT * FROM comments", (err, results) => {
        if(err) {
            console.log(err)
        }
        res.send(results);
    });
}

exports.createComment = (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const content = req.body.content;
    const postId = req.body.postId;

    console.log(req.params)
    console.log(req.body)
    console.log(postId)
}