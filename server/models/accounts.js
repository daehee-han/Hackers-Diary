const mongoose = require('mongoose');

const Database = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

Database.index({
    username : 1
})

module.exports = mongoose.model('accounts', Database);
