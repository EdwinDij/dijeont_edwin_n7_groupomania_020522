const { Post } = require("../models");
const { User } = require("../models");
const { Like } = require("../models");
const { Comment } = require("../models");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken")


// RECUPERATION DE TOUT LES POSTS
exports.getAllPost = (req, res, next) => {
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ["pseudo", "photo", "id"],
      },
      {
        model: Comment,
        attributes: ["message", "UserId", "updatedAt"],
      },
      {
        model: Like,
      },
    ],
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

// CREATION D'UN POST ...
exports.createPost = (req, res, next) => {
  const test = req.file;
  let token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const userId = decodedToken.id;

  if (req.body.UserId != userId) {
    return res.status(401).json("requete non authentifiée !");
  } else {

  if (test == null) {
    //...SANS IMAGE
    Post.create({
      UserId: req.body.UserId,
      message: req.body.message,
      video: req.body.video,
    })
      .then(() =>
        res.status(201).json({ message: "Le post a été créé sans image" })
      )
      .catch((error) => res.status(500).json({ error }));
  } else {
    Post.create({
      //...AVEC UNE IMAGE
      UserId: req.body.UserId,
      message: req.body.message,
      picture: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
      video: req.body.video,
    })
      .then(() =>
        res.status(201).json({ message: "Le post a été créé avec une image" })
      )
      .catch((error) => res.status(500).json({ error }));
  }
  }
  console.log(token)
  console.log(userId)
};

//SUPPRESSION D'UN POST
exports.deletePost = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const userId = decodedToken.id;

  Post.findOne({_id: req.params.id})
    .then(Post => {
        if (Post.UserId !== userId && decodedToken.isAdmin==0) {
          console.log(Post.UserId)
            return res.status(401).json("requête non autorisée !");
        } else{
        Post.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "post suprrimé" }))
        .catch((error) => res.status(400).json({ error }));
        }
    })
}


//MODIFICATION D'UN POST
exports.updatePost = (req, res, next) => {
let token = req.headers.authorization.split(" ")[1];
const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
const userId = decodedToken.id;

  Post.findOne({ _id: req.params.id })
  .then(Post => {
    if(Post.UserId != userId && decodedToken.isAdmin==0) {
      console.log(Post.UserId)
        return res.status(401).json("requête non autorisée !");
        
    } else {
      Post.update({where : {id: req.params.id},
        message: req.body.message,
        picture: req.body.picture,
        video: req.body.video,
      })
      .then(() => res.status(200).json({ message: "post modifié" }))
      .catch((error) => res.status(400).json({ error }));
    }
  })
}
 
// RECUPERATION DES POSTS D'UN USER
exports.getPostByUserId = (req, res, next) => {
  Post.findAll({ where: { UserId: req.params.id } })
    .then((postId) => res.status(200).json(postId))
    .catch((error) => res.status(404).json({ error }));
};
