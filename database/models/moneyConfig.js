const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    servidor: {type: String},
    emoji: {type: String},
    cooldowns: {
        rob: {type: String},
        crime: {type: String},
        work: {type: String},
        mine: {type: String}
    }
})

module.exports = mongoose.model("moneyConfig", schema);