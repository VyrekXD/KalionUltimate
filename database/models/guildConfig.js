const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    guildID: {type: String},
    guildPrefix: {type: String, default: 'k-'},
    modConfig: {
        status: {type: Boolean, default: true}, 
        onlyMod: {type: Boolean, default: false},
    },
    nsfwConfig: {
        status: {type: Boolean, default: true},
        noNSFW: {type: Boolean, default: false},
        furrySearch: {type: String, default: 'e621'},
        furryStatus: {type: Boolean, default: true},
    },
    automodConfig: {
        status: {type: Boolean, default: true},
        evasiveMute: {type: Boolean, default: false}
    },
    logsConfig: {
        status: {type: Boolean, default: false},
        channelID: {type: String, default: false},
        channelCreate: {type: Boolean, default: true},
        channelDelete: {type: Boolean, default: true},
        guildBoostAdd: {type: Boolean, default: true},
        guildBoostRemove: {type: Boolean, default: true},
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
        emojiUpdate: {type: Boolean, default: true},
        evasiveMute: {type: Boolean, default: true}
    },
    moneyConfig: {
        status: {type: Boolean, default: true},
        emojiName: {type: String, default: '💵'},
        cooldowns: {
            rob: {type: Number, default: 50},
            crime: {type: Number, default: 50},
            work: {type: Number, default: 30},
            mine: {type: Number, default: 40}
        }
    }
})

module.exports = mongoose.model("guildsConfig", schema);