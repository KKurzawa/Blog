const Post = require('../models/Post.js')

const CreatePost = async (req, res) => {
    const { title, summary, content, cover } = req.body
    const postDoc = await Post.create({
        title, summary, content, cover
    })
    try {
        res.json(postDoc)
    } catch (err) {
        res.status(400)
    }
}

const GetPosts = async (req, res) => {
    const postDoc = await Post.find({})
    try {
        res.json(postDoc)
    } catch (err) {
        res.status(400)
    }
}

module.exports = { CreatePost, GetPosts }