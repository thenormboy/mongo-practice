const express = require('express')
const { connectToDb, getDb } = require('./db')

//init app and middleware

const app = express()

// db connection

let db

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('listening to port 3000')
        })
        db = getDb()
    }
})


app.get('/books', (req, res) => {
    res.json({mssg: "welcome"})
})