const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    servidor: {type: String},
    usuario: {type: String},
    dineroX5: {type: Boolean, default: false},
    mineX5: {type: Boolean, default: false},
    dineroX3: {type: Boolean, default: false},
    mineX3: {type: Boolean, default: false}
    
})

module.exports = mongoose.model("cajas", schema);