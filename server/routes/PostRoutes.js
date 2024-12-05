const express = require('express')
const router = express.Router()

const { CreatePost, GetPosts } = require('../controllers/PostController.js')

router.post('/post/create', CreatePost)
router.get('/post', GetPosts)

module.exports = router