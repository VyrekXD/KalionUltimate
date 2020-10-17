const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    guildID: {type: String},
    furrySearch: {type: String, default: 'e621'},
    furryStatus: {type: Boolean, default: true},
    noNSFW: {type: Boolean, default: true}
})

module.exports = mongoose.model("nsfwConfig", schema);