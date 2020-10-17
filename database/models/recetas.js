const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    usuario: {type: String},
    servidor: {type: String},
    pan: {type: Boolean, default: false},
    pastel: {type: Boolean, default: false},
    hamburgesas: {type: Boolean, default: false},
    pizza: {type: Boolean, default: false},
    sushi: {type: Boolean, default: false},

})

module.exports = mongoose.model("recetas", schema);