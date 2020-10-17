const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    servidor: {type: String},
    automod: {type: Boolean, default: true},
    evasiveMute: {type: Boolean, default: false}
    
})

module.exports = mongoose.model("automod", schema);