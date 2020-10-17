const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    servidor: {type: String},
    nombre: {type: String},
    descripcion: {type: String},
    precio: {type: String},
    stock: {type: String},
    showInInventory: {type: Boolean},
    tiempo: {type: String},
    roleOtorgar: {type: String, default: null},
    roleRemover: {type: String, default: null},
    
})

module.exports = mongoose.model("serverShop", schema);