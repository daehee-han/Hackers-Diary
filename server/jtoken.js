const Enum = require("./Enum");
const Sessions = require('./models/session');

const jtoken = {}

jtoken.get = async (key) => {
    return await Sessions.findOne({key: key}).exec()
}

jtoken.set = async (key, value) => {
    let res = await jtoken.get(key);
    if(!res) {
        await Sessions.create({key: key, data: value}).exec()
        return true;
    }
    res = await Sessions.updateOne({key: key}, {$set:{data:value}}).exec()
    return true;
}

module.exports = jtoken

