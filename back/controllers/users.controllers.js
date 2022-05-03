const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('../models/users.models');
const validator = require('email-validator');


exports.signup = (req, res) => {
    if(!validator.validate(req.body.email))return res.status(403).json({message: 'Le format de l\'adresse mail est incorrect.'})
    if(req.body.password.length > 8) {
    console.log('bonjour')
    bcrypt.hash(req.body.password, 10)
    console.log('ici 2')
        .then(hash => {
            const myUser = users.create({
                lastname: req.body.lastname,
                firstName: req.body.firstName,
                email: req.body.email,
                password: hash
            });
            console.log('ici 3')
            myUser.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé.' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    } else return res.status(403).json({message: 'Votre mot de passe doit contenir 8 caractères minimum.'})
};
exports.login = (req, res, next) => {
    users.findOne({ email: req.body.email })
        .then(myUser => {
            if (!myUser) { return res.status(401).json({ error: 'Utilisateur non trouvé.' }); }
            bcrypt.compare(req.body.password, myUser.password)
                .then(valid => {
                    if (!valid) { return res.status(401).json({ error: 'Mot de passe incorrect.' }); }
                    const newToken = jwt.sign({ userId: myUser._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
                    res.setHeader('Authorization', 'Bearer ' + newToken);
                    res.status(200).json({
                        userId: myUser._id,
                        token: newToken
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await user.findOne({ where: { id: req.params.id } });
        if (user.avatar !== null) {
            const filename = user.avatar.split("/images")[1];
            user.destroy({ where: { id: req.params.id } })
            res.status(200).json({ message: 'utilisateur supprimé !' });
        } else {
            user.destroy({ where: { id: req.params.id } })
            res.status(200).json({ message: 'utilisateur supprimé !' })
        }
    } catch (error) {
        return res.status(500).send({ error })
    }
};

exports.modifyUser = async (req, res, next) => {
    try {
        let newPhoto;
        let user = await user.findOne({ where: { id: req.params.id } });

        if (req.file && user.avatar) {
            newPhoto = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        }
        if (newPhoto) {
            user.avatar = newPhoto;
        }
        if (req.body.name) {
            user.name = req.body.name
        }
        if (req.body.lastName) {
            user.lastName = req.body.lastName
        }
        if (req.body.password) {
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

exports.getAllUsers = (req, res, next) => {
    posts.find()
        .then(newPosts => res.status(200).json(newUsers))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    posts.findOne({ _id: req.params.id })
        .then(newPosts => res.status(200).json({ error }));
};
