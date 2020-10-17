const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    servidor: {type: String},
    canals: {type: String},
    channelCreate: {type: Boolean, default: true},
    channelDelete: {type: Boolean, default: true},
    banAdd: {type: Boolean, default: true},
    banRemove: {type: Boolean, default: true},
    memberAdd: {type: Boolean, default: true},
    memberRemove: {type: Boolean, default: true},
    memberUpdate: {type: Boolean, default: true},
    inviteCreate: {type: Boolean, default: true},
    inviteDelete: {type: Boolean, default: true},
    messageDelete: {type: Boolean, default: true},
    messageUpdate: {type: Boolean, default: true},
    roleCreate: {type: Boolean, default: true},
    roleDelete: {type: Boolean, default: true},
    roleUpdate: {type: Boolean, default: true},
    memberMuted: {type: Boolean, default: true},
    memberUnmuted: {type: Boolean, default: true},
    evasiveMute: {type: Boolean, default: false}
})

module.exports = mongoose.model("logs", schema);