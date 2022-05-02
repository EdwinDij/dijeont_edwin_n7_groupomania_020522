/*const posts = require ('../models/posts.models');
const auth  =  require ('../middlewares/auth.middlewares');


exports.createPosts = (req, res, next) => {
    const postObject = JSON.parse(req.body.posts);
    const newPosts = new posts({
        ...postObject,
        userId: req.body.userId,
        content: req.body.content,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        timestamps: new Date().getTime()
    });

    newPosts.save()
    .then(()=> res.status(201).json({ message : 'Nouveau posts inséré avec succés ! '}))
    .catch(error => res.status(400).json({ error}));
}

exports.getAllPosts = (req, res, next) => {
    posts.find()
        .then(newPosts => res.status(200).json(newPosts))
        .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    posts.findOne({_id: req.params.id})
        .then(newPosts =>res.status(200).json({ error }));
};


    //modification du posts
exports.updatePosts = (req, res, next) => {
    posts.findOne({ _id: req.params.id }).then(res_posts => {
        if(res_posts.userId !== req.atuh.userId) {
            res.status(401).json({ error : new Error ('Requête non autorisé!')})
        }

        const postObject = req.file ? 
        {
            ...JSON.parse(req.body.posts),
            image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

        function updateProcess() {
            posts.updateOne ({ _id: req.params.id}, {...postObject, _id:req.params.id})
            .then(() => {
                console.log("Updated");
                return res.status(200).json({ message: 'Post modifié'})
        }
            )
            .catch(error => res.status(400).json({ error }));
        }
        if(req.file) {
            fs.unlink(res_posts.imageUrl.substring(res_posts.imageUrl.indexOf('images/')), () =>{

            })
        }
        else {
            updateProcess()
        }
    })
    .catch(error => res.status(400).json({ error }));
}

exports.deletePosts = (req,res , next) => {

    posts.findOne({
        _id: req.params.id
    })
    .then ((posts) => {

        const filename=  posts.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            if(!posts) {
                return res.status(404).json({
                    error: new Error ('Objet non trouvé !')
                });
            }
            if(posts.userId !== req.auth.userId) {
                return res.status(401).json ({
                    error: new Error ('Requête non autorisé ! ')
                });
            }
            
            posts.deleteOne ({
                _id: req.params.id
            })
            .then(() => res.status(200).json({
                Message: 'Objet Supprimé !'
            }))
            .catch(error => res.status(400).json({
                error
            }));
        });
    })
    .catch(error => res.status(500).json({
        error
    }))
};

exports.likePosts = (req, res, next) => {
    if(req.body.like === 1) {
        posts.updateOne(
            {_id: req.params.id},
            {$inc: {likes: +1}, $push: { usersLiked: req.body.userId}})
            .then((posts) => res.status(200).json({message : 'Like ajouté !'}))
            .catch(error => res.status(400).json({ error }))        
    }
    else {
        posts.findOne({_id: req.params.id})
        .then(posts => {
            if(posts.usersLiked.includes(req.body.userId)) {
                posts.updateOne(
                    {$inc: {likes: -1}, $pull: {usersLiked: req.body.userId}})
                    .then(() => res.status(200).json({message: 'Like enlevé'}))
                    .catch(error => res.status(400).json({error})
                )
            }
        })
    }
 };*/