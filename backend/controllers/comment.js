const { User } = require("../models");
const { Comment } = require("../models");
const jwt = require('jsonwebtoken')
const auth = require("../middleware/auth");
// RECUPERATION DE TOUT LES COMMENTAIRES
exports.getAllComment = async (req, res, next) => {
  await Comment.findAll({
    where: { PostId: req.params.id },
    include: {
      model: User,
      attributes: ["pseudo", "photo", "id"],
    },
  })
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(404).json({ error }));
};

// CREATION D'UN COMMENTAIRE
exports.createComment = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const userId = decodedToken.id;

  if (req.body.UserId != userId) {
    return res.status(401).json("requete non authentifiée !");
  } else {
    Comment.create({
      UserId: req.body.UserId,
      PostId: req.body.PostId,
      message: req.body.message,
    })
      .then(() => res.status(201).json({ message: "commentaire créé" }))
      .catch((error) => res.status(400).json({ error }));
  };
  console.log(req.body.UserId, userId);
}

// SUPPRESSION D'UN COMMENTAIRE
exports.deleteComment = async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const userId = decodedToken.id;

  Comment.findOne({_id: req.params.id})
  .then(Comment => {
    if (Comment.UserId !== userId && decodedToken.isAdmin==0) {
      return res.status(401).json("requete non authentifiée !");
    } else {
   Comment.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "commentaire suprrimé" }))
    .catch((error) => res.status(400).json({ error }));
    }
  })
};
