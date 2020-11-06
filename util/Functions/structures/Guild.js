const configModel = require('../../../database/models/guildConfig')

module.exports = Guild => {
    return class extends Guild {
      constructor(client, data) {
        super(client, data);
        this.prefix = 'k!'
      }
    /**
    * @returns {object} - Devuelve el documento de mongoose
    */
    async getPrefix(){
      let find = await configModel.findOne({guildID: this.id})

      if(!find)return undefined;
      this.prefix = find.guildPrefix
      return this.prefix;
    }
    /**
     * 
     * @param {string} newprefix - El nuevo prefix
     * @returns {object} - Devuelve el documento de mongoose
     */
    async setPrefix(newprefix){
      let find = await configModel.findOne({guildID: this.id})

      if(!find)return undefined;

      let doc = await configModel.updateOne({guildID: this.id}, {$set: {guildPrefix: newprefix}}).catch(a=>{})

      return doc;
    }
    }
}