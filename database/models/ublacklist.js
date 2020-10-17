const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    usuario: {type: String},
    razon: {type: String}
})

module.exports = mongoose.model("ublacklisted", schema);