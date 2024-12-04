const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logoutUser, getUsers, getUser, deleteUser } = require("../controllers/UserController.js");

router.post('/users/register', registerUser)
router.post('/users/login', loginUser)
router.post('/users/logout', logoutUser)
router.get('/users', getUsers)
router.get('/users/:id', getUser)
router.delete('/users/:id', deleteUser)

module.exports = router