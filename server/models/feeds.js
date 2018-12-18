const mongoose = require('mongoose');

const Database = new mongoose.Schema({
    creator : {
        type: String,
        require: true
    },
    title : {
        type: String,
        require: true
    },
    link : {
        type: String,
        require: true,
    },
    pubDate : {
        type: Number,
        require: true
    },
    author : {
        type: String,
        require: true
    },
    comments : {
        type: String,
        require: true
    },
    content : {
        type: String,
        require: true
    },    
    contentSnippet : {
        type: String,
        require: true
    },
    guid : {
        type: String,
        require: true,
        unique: true
    },
    categories : {
        type: String,
        require: true
    },
    isoDate : {
        type: Number,
        require: true
    }
}, {
    timestamps: true
});

Database.index({
    username : 1
})

module.exports = mongoose.model('feeds', Database);
