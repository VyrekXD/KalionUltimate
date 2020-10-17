
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    usuario: {type: String},
    servidor: {type: String},
    ingredientes: {
        tomate: {type: Number, default: 0},
        masa: {type: Number, default: 0},
        lechuga: {type: Number, default: 0},
        tomate: {type: Number, default: 0},
        pepperoni: {type: Number, default: 0}
    },
    comidas: {
        hamburgesa: {type: Number, default: 0},
        pan: {type: Number, default: 0},
        pizza: {type: Number, default: 0},
        sushi: {type: Number, default: 0},
        pastel: {type: Number, default: 0}
    }

})

module.exports = mongoose.model("cocina", schema);