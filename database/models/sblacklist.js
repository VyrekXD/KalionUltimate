const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    guildID: {type: String},
    devID: {type: String},
    reason: {type: String},
    date: {type: String}
})

module.exports = mongoose.model("sblacklisted", schema);