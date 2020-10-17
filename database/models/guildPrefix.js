const mongoose = require('mongoose')

const schemaPrefixes = new mongoose.Schema({
    servidor: {type: String},
    prefix: {type: String}
})

module.exports = mongoose.model("GuildPrefixes", schemaPrefixes );