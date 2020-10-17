const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    servidor: {type: String},
    usuario: {type: String},
    dinero: {type: Number, default: 0},
    banco: {type: Number, default: 0},
    dinerotot: {type: Number, default: 0}
})

module.exports = mongoose.model("dinero", schema);