const express = require("express")
const router = express.Router()
const commentCtrl = require("../controllers/comments.controllers")
const auth = require("../middlewares/auth.middlewares")

router.get("/", auth, commentCtrl.getAllComments);
router.post("/", auth, commentCtrl.createComments);
router.put("/;id", auth, commentCtrl.updateComments);
router.delete("/:id", auth, commentCtrl.deleteComments);

module.exports =  router