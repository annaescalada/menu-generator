const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'menu-generator'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) return console.log('Error connecting to DB')
    
    const db = client.db(databaseName)
    
    db.collection('ingredients').insertOne({
        name: 'zanahoria'
    })
})