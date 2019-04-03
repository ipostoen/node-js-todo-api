const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/model/todo');

var id = '5c16329a3887f11b0a16ddd2';

if (!ObjectID.isValid(id)) {
    console.log('Id not valid');
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos:', todos);
// }, (e) => {
//     console.log(e);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo:',todo);
// }, (e) => {
//     console.log(e);
// });

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not found');
    }
    console.log('Todo by id:', todo);
}).catch((e) => console.log(e));
