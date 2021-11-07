const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aidReqSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

// dodati polje isFinshed
// dodati polje createdAt

module.exports = mongoose.model('AidReqPost', aidReqSchema);