const Post = require('../models/postModel')
const mongoose = require('mongoose')


// get all posts
const getPosts = async (req, res) => {
    const posts = await Post.find({}).sort({createAt: -1})

    res.status(200).json(posts)
}

// get a single post
const getPost = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId(id)) {
        return res.status(404).json({ error: 'No such post' })
    }

    const post = await Post.findById(id)

    if(!post) {
        return res.status(400).json({error: 'No such post'})
    }
    res.status(200).json(post)
}

// create post
const createPost = async (req, res) => {
    const { title, content } = req.body

    try {
        const post = await Post.create({ title, content})
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log(error)
    }
}

// delete post
const deletePost = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId(id)) {
        return res.status(404).json({error: 'No such post'})
    }

    const post = await Post.findByIdAndDelete({_id: id})

    res.status(200).json(post)
} 

// update post
const updatePost = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such post'})
    }

    const post = await Post.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!post) {
        return res.status(404).json({error: 'No such post'})
    }
    res.status(200).json(post)
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}