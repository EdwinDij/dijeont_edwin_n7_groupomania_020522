/*const comments = require('../models/comments.models')
const auth =  require ('../middlewares/auth.middlewares')


exports.createComments = (req, res, next) => {
    const commentsObject = JSON.parse(req.body.comments);
    const newComments = new comments ({
        ...commentsObject,
        userId: req.body.userId,
        content: req.body.content,
        imageURL:  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        timestamps: new Date().getTime()
    });

    newComments.save()
    .then(()=> res.status(201).json ({ message : "nouveau commentaire inséré avec succès !"}))
    .catch(error => res.status(400).json ({ error}))
}

exports.getAllComments = (req, res, next) =>{
    comments.find()
    .then(newComments => res.status(200).json(newComments))
    .catch(error => res.status(400).json ({error}))
};


exports.updateComments = (req, res, next) => {
    comments.findOne({ _id: req.params.id }).then(res_comments => {
        if(res_comments.userId !== req.atuh.userId) {
            res.status(401).json({ error : new Error ('Requête non autorisé!')})
        }

        const postObject = req.file ? 
        {
            ...JSON.parse(req.body.comments),
            image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

        function updateProcess() {
            comments.updateOne ({ _id: req.params.id}, {...postObject, _id:req.params.id})
            .then(() => {
                console.log("Updated");
                return res.status(200).json({ message: 'Post modifié'})
        }
            )
            .catch(error => res.status(400).json({ error }));
        }
        if(req.file) {
            fs.unlink(res_comments.imageUrl.substring(res_comments.imageUrl.indexOf('images/')), () =>{

            })
        }
        else {
            updateProcess()
        }
    })
    .catch(error => res.status(400).json({ error }));
}

exports.deleteComments = (req,res , next) => {

    comments.findOne({
        _id: req.params.id
    })
    .then ((comments) => {

        const filename=  comments.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            if(!comments) {
                return res.status(404).json({
                    error: new Error ('Objet non trouvé !')
                });
            }
            if(comments.userId !== req.auth.userId) {
                return res.status(401).json ({
                    error: new Error ('Requête non autorisé ! ')
                });
            }
            
            comments.deleteOne ({
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
};*/