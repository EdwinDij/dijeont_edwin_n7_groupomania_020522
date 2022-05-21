const express = require('express')
const router = express.Router()
const postCtrl = require('../controllers/posts')

router.get('/', postCtrl.getPosts);

module.exports = router;