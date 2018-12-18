const mongoose = require('mongoose');

const Database = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    feed : {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

Database.index({
    username : 1
})

module.exports = mongoose.model('like', Database);
