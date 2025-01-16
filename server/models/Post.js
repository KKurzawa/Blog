const mongoose = require('mongoose')
const { Schema, model } = mongoose
const { ObjectId } = mongoose.Schema.Types

const PostSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    image: String,
    likes: [String],
    author: String
}, {
    timestamps: true
})

const PostModel = model('Post', PostSchema)

module.exports = PostModel