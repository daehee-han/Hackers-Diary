const mongoose = require('mongoose');

const Database = new mongoose.Schema({
    key : {
        type: String,
        required: true,
        unique: true
    },
    data : {
        type: Object,
        required: true,
    },
}, {
    timestamps: true
});

Database.index({
    username : 1
})

module.exports = mongoose.model('session', Database);
