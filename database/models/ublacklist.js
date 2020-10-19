const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userID: {type: String},
    devID: {type: String},
    reason: {type: String},
    date: {type: String}
})

module.exports = mongoose.model("ublacklisted", schema);