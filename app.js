const express = require('express')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')

//init app and middleware

const app = express()
app.use(express.json())

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

    const page = req.query.page || 0

    const booksPerPage = 2

    let books = []

    db.collection('books')
        .find()
        .sort({ author: 1 })
        .skip(page * booksPerPage)
        .limit(booksPerPage)
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books)
        })
        .catch(() => {
            res.status(500).json({error: 'no documents found'})
        })

})

app.get('/books/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {

        db.collection('books')
        .findOne({_id: new ObjectId(req.params.id)})
        .then((doc) => {
            res.status(200).json(doc)
        })
        .catch((err) => {
            res.status(500).json({error: 'no documents found'})
        })

    } else {
        res.status(500).json({error: 'invalid document id'})
    }

})

app.post('/books', (req, res) => {
    const book = req.body

    db.collection('books')
        .insertOne(book)
        .then((result) => {
            res.status(201).json(result)
        })
        .catch((err) => {
            res.status(500).json({error: "could not creat doc"})
        })
})

app.delete('/books/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {

        db.collection('books')
        .deleteOne({_id: new ObjectId(req.params.id)})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(500).json({error: 'could not dleete doc'})
        })

    } else {
        res.status(500).json({error: 'invalid document id'})
    }
})

app.patch('/books/:id', (req, res) => {
    const update = req.body

    if (ObjectId.isValid(req.params.id)) {

        db.collection('books')
        .updateOne({_id: new ObjectId(req.params.id)}, {$set: update})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(500).json({error: 'could not update doc'})
        })

    } else {
        res.status(500).json({error: 'invalid document id'})
    }
})