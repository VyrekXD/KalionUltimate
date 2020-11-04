const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    guildID: {type: String, required: true},
    userID: {type: String, required: true},
    cooldowns: {
        mine: {type: Number, default: 0},
        crime: {type: Number, default: 0},
        rob: {type: Number, default: 0},
        work: {type: Number, default: 0}
    }
})

module.exports = mongoose.model("usercooldown", schema);