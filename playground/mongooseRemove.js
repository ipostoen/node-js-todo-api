const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/model/todo');

var id = '5c16329a3887f11b0a16ddd2';

if (!ObjectID.isValid(id)) {
    console.log('Id not valid');
}

Todo.remove({}).then((result) => {
    console.log(result);
});

Todo.findOneAndRemove({_id: id}).then((result) => {
    console.log(result);
});

Todo.findByIdAndRemove(id).then((todo) => {
    console.log(todo);
});