const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const userCtrl = require('../controllers/user')

router.post ('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.delete('/delete/:id'), userCtrl.delete

module.exports = router;