const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/comment')

router.get('/',commentCtrl.getComment);

module.exports = router;