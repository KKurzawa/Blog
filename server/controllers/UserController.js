const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const salt = bcrypt.genSaltSync(10)

const secret = process.env.SECRET

const registerUser = async (req, res) => {
    const { email, username, password } = req.body
    const duplicate = await User.findOne({ username }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    } else {
        const userDoc = await User.create({
            email, username, password: bcrypt.hashSync(password, salt)
        })
        try {
            res.json(userDoc)
        } catch (err) {
            console.log(err.message)
            res.status(500).send({ message: err.message })
        }
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    const userDoc = await User.findOne({ email })
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if (passOk) {
        jwt.sign({ email, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err
            res.cookie('token', token).json({
                id: userDoc._id,
                email
            })
        })
    } else {
        res.status(400).json('Wrong credentials!')
    }
}

const logoutUser = (req, res) => {
    res.cookie('token', '').json('ok');
}

const getUsers = async (req, res) => {
    const userDoc = await User.find()
    res.json(userDoc)
    console.log(userDoc)
}

const getUser = async (req, res) => {
    const { id } = req.params
    const userDoc = await User.findById(id)
    res.json(userDoc)
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    const userDoc = await User.findByIdAndDelete(id)
    try {
        res.json(userDoc)
    } catch (err) {
        res.json(err)
    }
    console.log(`User with id: ${id} deleted!`)
}

module.exports = { registerUser, loginUser, logoutUser, getUsers, getUser, deleteUser }