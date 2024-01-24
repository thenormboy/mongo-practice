const { MongoClient } = require('mongodb')

let dbConnection

module.exports = {
    connectToDb: (callbackFunction) => {
        MongoClient.connect('mongodb://localhost:27017/bookstore')
            .then((client) => {
                dbConnection = client.db()
                return callbackFunction()
            })
            .catch((err) => {
                console.log(err)
                return callbackFunction(err)
            })
    },
    getDb: () => dbConnection
}