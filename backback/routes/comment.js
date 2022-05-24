const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/comment')

router.get('/',commentCtrl.getComment);
router.post('/', commentCtrl.createComment);

module.exports = router;