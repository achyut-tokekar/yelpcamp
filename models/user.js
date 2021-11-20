const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const UserSChema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

UserSChema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSChema);