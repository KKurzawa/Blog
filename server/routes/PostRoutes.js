const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

const { CreatePost, GetPosts, GetPost, UpdatePost, DeletePost, LikePost, DislikePost } = require('../controllers/PostController.js')

router.post('/post/create', upload.single('file'), CreatePost)
router.get('/post', GetPosts)
router.get('/post/:id', GetPost)
router.put('/post/update/:id', upload.single('image'), UpdatePost)
router.delete('/post/delete/:id', DeletePost)
router.put('/post/like/:id', LikePost)
router.put('/post/dislike/:id', DislikePost)

module.exports = router