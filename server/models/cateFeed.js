const mongoose = require('mongoose');

const Database = new mongoose.Schema({
    username : {
        type: String,
        required: true,
    },
    category : {
        type: String,
        required: true,
    },
    feed : {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('cateFeed', Database);
