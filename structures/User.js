const mineriaModel = require('../database/models/mineria')
const coolModel = require('../database/models/userCooldowns')

module.exports = User => {
    return class extends User {
        constructor(client, data) {
            super(client, data)
        }

        async getCooldown(guildID){
            let find = await coolModel.findOne({guildID: guildID, userID: this.id})

            if(!find)return undefined;

            return find;
        }
    }
}

