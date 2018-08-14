const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Comment = new Schema({
    dataId: {type: Schema.Types.ObjectId, ref: 'Data'},
    authorId: {type: Schema.Types.ObjectId, ref: 'User'},
    comment: String,
    authorname: String,
    date: {
        type: Date,
        default: Date.now
    }
},{
    collection: 'comment'
});

module.exports = mongoose.model('Comment', Comment);

