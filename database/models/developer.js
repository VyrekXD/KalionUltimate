const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    developer: {type: String}
})

module.exports = mongoose.model("devs", schema);