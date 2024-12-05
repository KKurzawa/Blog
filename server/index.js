require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const User = require('./models/User.js')

const userRouter = require('./routes/UserRoutes.js')
const postRouter = require('./routes/PostRoutes.js')

const { PORT, DBCONNECT } = require('./config/connect.js')

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(postRouter)

mongoose.connect(DBCONNECT).then(() => {
    console.log('Connected to MongoDB')
    try {
        app.listen(PORT)
        console.log(`App running on PORT:${PORT}`)
    } catch (err) {
        console.log(err)
    }
})