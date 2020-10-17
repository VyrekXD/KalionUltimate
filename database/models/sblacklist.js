const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    server: {type: String},
    razon: {type: String}
})

module.exports = mongoose.model("sblacklisted", schema);