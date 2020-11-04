const configModel = require('../../../database/models/guildConfig')

module.exports = Guild => {
    return class extends Guild {
      constructor(client, data) {
        super(client, data);
        this.prefix = 'k!'
      }

    async getPrefix(){

    }
    }
}