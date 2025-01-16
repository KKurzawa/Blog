const Post = require('../models/Post.js')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const secret = process.env.SECRET

const CreatePost = async (req, res) => {
    const { title, summary, content, author } = req.body
    const image = req.file.filename
    const postDoc = await Post.create({
        title, summary, content, image, author
    })
    try {
        console.log(req.body.image)
        res.json(postDoc)
    }
    catch (err) {
        console.log(err)
    }
}

const GetPosts = async (req, res) => {
    const postDoc = await Post.find({})
    try {
        res.json(postDoc)
        console.log(postDoc)
    } catch (err) {
        res.status(400)
    }
}

const GetPost = async (req, res) => {
    const { id } = req.params
    const postDoc = await Post.findById(id)
    try {
        res.json(postDoc)
        console.log(postDoc)
    } catch (err) {
        console.log(res)
    }
}

const UpdatePost = async (req, res) => {
    const { id } = req.params
    const { title, summary } = req.body
    const image = req.image
    console.log(image)
    const postDoc = await Post.findByIdAndUpdate(id, { title, summary, image })
    try {
        res.json(postDoc)
    } catch (err) {
        console.log(err)
    }
}

const DeletePost = async (req, res) => {
    const { id } = req.params
    await Post.findByIdAndDelete(id)
    try {
        res.json(`Post with ID: ${id} deleted.`)
    } catch (err) {
        console.log(err)
    }
}

const LikePost = async (req, res) => {
    const { id } = req.params
    const { likes } = req.body
    const postDoc = await Post.findByIdAndUpdate(id, { $push: { likes: likes } })
    try {
        postDoc.likes.push(likes)
        res.json(postDoc)
        console.log(postDoc.likes)
    } catch (err) {
        console.log(err)
    }
}

const DislikePost = async (req, res) => {
    const { id } = req.params
    const { likes } = req.body
    const newPostDoc = []
    const postDoc = await Post.findByIdAndUpdate(id, { $pull: { likes: likes } })
    try {
        // for (let i = 0; i < postDoc.likes.length; i++) {
        //     if (postDoc.likes[i] !== likes) {
        //         newPostDoc.push(postDoc.likes[i]);
        //     }
        // }
        postDoc.likes.pull(likes)
        res.json(postDoc)
        console.log(postDoc)
    } catch (err) {
        console.log(res)
    }
}

module.exports = { CreatePost, GetPosts, GetPost, UpdatePost, DeletePost, LikePost, DislikePost }