const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    guildID: {type: String, required: true},
    userID: {type: String, required: true},
    cooldowns: {
        mine: String,
        crime: String,
        rob: String,
        work: String
    }
})

module.exports = mongoose.model("usercooldown", schema);