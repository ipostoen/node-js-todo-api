// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connect to MongoDB server');

    const db = client.db('TodoApp');

   //deleteMANY
   //  db.collection('Todo').deleteMany({text: 'Eat lunch'}).then((result) => {
   //      console.log(result);
   //  });

    //deleteOnr
    // db.collection('Todo').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //findOneDelete
    db.collection('Todo').findOneAndDelete({completed: false}).then((result) => {
        console.log(result);
    });

    client.close();
});