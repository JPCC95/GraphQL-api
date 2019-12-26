const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:{
        type: String,
        require: true,
    },
    content:{
        type: String,
        require: true,
    },
    published:{
        type: Boolean,
        require: true,
    }
});

module.exports = mongoose.model('Post', PostSchema);