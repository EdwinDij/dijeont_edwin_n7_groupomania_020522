const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');
const users = require ('../models/users.models');
const validator = require ('email-validator');


    exports.signup = (req, res, next) => {
        bcrypt.hash(req.body.password, 10) 
            .then(hash => {
                const user = users.create ({ // nouvel utilisateur
                    lastname: req.body.lastname,
                    firstname: req.body.firstname,
                    email: req.body.email,
                    password: hash   
                });        
                user.save() // enregistre dans la base de données 
                    .then(() => res.status(201).json({ message: 'Utilisateur crée !'})) // création de ressources OK !
                    .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error })); // erreur serveur
    };

exports.login = (req, res, next) => {
    users.findOne({ email: req.body.email })
        .then(myUser => {
            if(!myUser) { return res.status(401).json({ error: 'Utilisateur non trouvé.' }); }
            bcrypt.compare(req.body.password, myUser.password)
            .then(valid => {
                if(!valid) { return res.status(401).json({ error: 'Mot de passe incorrect.' }); }
                const newToken = jwt.sign({ userId: myUser._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
                res.setHeader('Authorization', 'Bearer '+ newToken);
                res.status(200).json({
                    userId: myUser._id,
                    token: newToken
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    };

exports.deleteUser = async (req,res, next) =>{
    try {
        const user = await user.findOne({ where: { id: req.params.id } });
        if (user.avatar !== null) {
            const filename = user.avatar.split("/images") [1];
            user.destroy({ where: { id: req.params.id}})
            res.status(200).json ({ message: 'utilisateur supprimé !'});
        } else{
            user.destroy({ where:{ id: req.params.id }})
            res.status(200).json ({message: 'utilisateur supprimé !'})
        }
    } catch (error ) {
        return res.status(500).send({error})
    }
};

exports.modifyUser= async (req, res, next) => {
    try {
        let newPhoto;
        let user = await user.findOne({ where: { id: req.params.id}});

        if(req.file && user.avatar){
            newPhoto = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        }
        if(newPhoto){
            user.avatar = newPhoto;
        }
        if(req.body.name){
            user.name = req.body.name
        }
        if(req.body.lastName){
            user.lastName = req.body.lastName
        }
        if(req.body.password) {
            user.password = await bcrypt.hash(req.boy.password, 10)
        }

        const newUser = await user.save({
            fields: ["firstname", "lastName", "password", "avatar"],
        });
        res.status(200).json({
            user: newUser,
            messageRetour: "Profile modifié",
        });
        } catch (error) {
            return res.status(500).send({ error });
        }
    };
