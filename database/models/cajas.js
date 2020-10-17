const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    servidor: {type: String},
    usuario: {type: String},
    cajaLegendaria: {type: Number, default: 0},
    cajaEpica: {type: Number, default: 0},
    cajaSuperRara: {type: Number, default: 0},
    cajaRara: {type: Number, default: 0},
    cajaComun: {type: Number, default: 0}
})

module.exports = mongoose.model("cajas", schema);