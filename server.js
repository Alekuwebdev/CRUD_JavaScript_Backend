require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const postRoutes = require('./routes/posts')
const cors = require('cors')

// express app
const app = express()

mongoose.set('strictQuery', false);

// middleware
app.use(express.json())

// cors
app.use(cors({
    origin: 'http://127.0.0.1:5501'
}))

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/posts', postRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('conntect to mongodb and listen on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
