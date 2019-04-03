require('./config/config');

const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./model/todo');
var {User} = require('./model/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();

const port = process.env.PORT || 2222;

app.use(bodyParser.json());

// TODO Method
app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});
app.get('/todos', authenticate, (req, res) => {
   Todo.find({
       _creator: req.user._id
   }).then((todos) => {
       res.status(200).send({todos});
   }, (e) => {
      res.status(400).send(e)
   });
});
app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Id not valid');
    }
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            res.status(404).send('Id not found');
        } else {
            res.status(200).send(todo);
        }
    }).catch((e) => res.status(404).send());

});
app.delete('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Id not valid');
    }
    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            res.status(404).send('Id not found');
        } else {
            res.status(200).send(`Todo was delete: ${todo}`);
        }
    }).catch((e) => res.status(404).send());
});
app.patch('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            res.status(404).send('Id not found');
        } else {
            res.status(200).send(todo);
        }
    }).catch((e) => console.log(e));
});

// USER Method
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send(e);
    });
});
app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});
app.get('/users/me', authenticate, (req, res) => {
    res.send(user);
});

app.listen(port, () => {
    console.log(`Started on port ${port}.`);
});