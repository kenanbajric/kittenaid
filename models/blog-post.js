const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    text: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false,
        unique: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema);