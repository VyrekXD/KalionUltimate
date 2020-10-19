const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userID: {type: String}
})

module.exports = mongoose.model("devs", schema);