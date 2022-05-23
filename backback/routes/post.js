const express = require('express')
const router = express.Router()
const postCtrl = require('../controllers/posts')
const upload = require('../middleware/multer-config')
const auth = require('../middleware/auth')

router.get('/', postCtrl.getPosts);
router.post('/', postCtrl.createPost);
router.delete('/delete/:id', postCtrl.deletePost);
module.exports = router;