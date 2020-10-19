const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    firstNames: {type: String},
    lastNames: {type: String},
    cellphoneNumber: {type: String},
    age: {type: Number},
    email: {type: String},
    __isUnderage: {type: Boolean},
    __isForDelete: {type: Boolean}
})

module.exports = mongoose.model("emails", schema);