// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connect to MongoDB server');

    const db = client.db('TodoApp');

    // db.collection('Todo').insertOne({
    //     text: 'Somthing to do',
    //     completed: false
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert todo.', error);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Iliya',
        age: 20,
        location: {
            lat: 212313,
            log: 124234
        }
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert todo.', error);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});