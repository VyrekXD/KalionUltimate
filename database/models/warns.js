const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    servidor: {type: String},
    targetid: {type: String},
    target: {
      username: {
        type: String
      },
      id: {
        type: String
      },
      discriminator: {
        type: String
      }
    },
    mod: {
      username: {
        type: String
      },
      id: {
        type: String
      },
      discriminator: {
        type: String
      }
    },
    raz: {type: String},
    tiempo: {type: String}
  })
  module.exports = mongoose.model("Warns", schema);