const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var User = new Schema({
    name: String,
    password: String
}, {
    collection: 'user'
});

module.exports = mongoose.model('User', User);