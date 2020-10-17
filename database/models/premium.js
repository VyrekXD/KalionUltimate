const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    usuario: {type: String}
})

module.exports = mongoose.model("premium", schema);