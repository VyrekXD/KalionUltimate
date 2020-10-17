const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    servidor: {type: String},
    usuario: {type: String},
    piedra: {type: Number, default: 0},
    carbon: {type: Number, default: 0},
    hierro: {type: Number, default: 0},
    diamante: {type: Number, default: 0},
    esmeralda: {type: Number, default: 0},
    zafiro: {type: Number, default: 0},
    ruby: {type: Number, default: 0},
    kalonsita: {type: Number, default: 0}
})

module.exports = mongoose.model("mineria", schema);