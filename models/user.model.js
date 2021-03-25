const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unqiue: true,
        trim: true,
        minlength: 3
    },
    userKey: {
        type: String,
        required: true,
        unqiue: true,
        trim: true,
    },
    following: { type: Array, required: true },
    followers: {type: Number, required: true}

}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;