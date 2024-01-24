const express = require('express')

//init app and middleware

const app = express()

app.listen(3000, () => {
    console.log('listening to port 3000')
})

app.get('/books', (req, res) => {
    res.json({mssg: "welcome"})
})