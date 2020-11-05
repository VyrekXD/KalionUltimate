const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userID: {type: String, required: true},
    user2ID: {type: String, required: true},
    date: {type: Number, required: true},
})

module.exports = mongoose.model("GuildPrefixes", schema );