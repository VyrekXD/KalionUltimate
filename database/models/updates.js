const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    query: {type: String, default: 1},
    totalUpdates: Array
})

module.exports = mongoose.model("updates", schema);