const mongoose = require('mongoose');
const mongoosePagination = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }

});

UserSchema.plugin(mongoosePagination);

module.exports = mongoose.model('User', UserSchema, 'users');