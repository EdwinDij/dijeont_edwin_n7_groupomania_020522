const express =  require ("express")
const router = express.Router()
const postCtrl = require ("../controllers/posts.controllers")
const auth = require ("../middlewares/auth.middlewares")
const multer = require ("../middlewares/multer.middlewares")

router.post("/", multer, postCtrl.createPosts)
router.get("/", auth, postCtrl.getAllPosts)
router.get("/", auth, postCtrl.getOnePost)
router.put("/", auth, postCtrl.updatePosts)
router.delete("/", auth, postCtrl.deletePosts)

module.exports = router