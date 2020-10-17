const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    usuario: {type: String},
    servidor: {type: String},
    mensaje: {type: String},
    hora: {type: String}
})

module.exports = mongoose.model("Snipe", schema);