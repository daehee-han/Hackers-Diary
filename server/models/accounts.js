const mongoose = require('mongoose');

const AccountsSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    fullname : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


AccountsSchema.statics.create = function(username, password, fullname, phone) {
    return (new this({
        username : username,
        password : password,
        fullname : fullname,
        phone : phone
    })).save()
};

AccountsSchema.statics.select = function(param) {
    return this.findOne(param);
}

AccountsSchema.statics.count = function() {
  return this.find({}).count();
}

module.exports = mongoose.model('accounts', AccountsSchema);
