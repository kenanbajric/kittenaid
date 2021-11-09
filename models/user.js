const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    imageUrl: {
        type: String,
        required: false,
        unique: true
    },
    cart: {
        items: [
            {
                productId: {type: Schema.Types.ObjectId, ref:'Product', required: true},
                quantity: {type: Number, required: true}
            }
        ]
    }
}, {
    timestamps: true
})

// vise nivoa usera 2-3

module.exports = mongoose.model('User', userSchema);