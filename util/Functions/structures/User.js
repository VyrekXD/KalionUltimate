const mineriaModel = require('../../../database/models/mineria')
const coolModel = require('../../../database/models/userCooldowns')

module.exports = User => {
    return class extends User {
        constructor(client, data) {
            super(client, data);

        }
        /**
         * 
         * @param {String} guildID - La ID de el servidor
         * @returns {object} - Devuelve el documento de mongoose
         */
        async getCooldown(guildID){
            let find = await coolModel.findOne({guildID: guildID, userID: this.id})

            if(!find)return undefined;

            return find;
        }
        /**
         * 
         * @param {String} guildid - La ID de el servidor
         * @param {number} time - El cooldown en numero
         * @param {String} option - Las opciones: mine, work, rob, crime
         * @returns {object} - Devuelve el documento de mongoose
         */
        async setCooldown(guildid, time, option){
            if(!guildid)throw new Error('No incluiste la ID de el servidor')
            if(!time)throw new Error('No incluiste el tiempo')
            if(!option)throw new Error('No incluiste una opcion correcta')
            if(time.isNaN)throw new Error('No incluiste el tiempo valido')
            let op = ['mine','work','rob','crime']
            if(!op.includes(option.toLowerCase()))throw new Error('No incluiste una opcion correcta: '+op)

            let find = await coolModel.findOne({guildID: guildid, userID: this.id})
            let doc;
            if(!find){
                doc = new coolModel({guildID: guildid, userID: this.id})
                doc.cooldowns[option] = time
                doc.save()
            }else {
                doc = await coolModel.findOne({guildID: guildid, userID: this.id})
                doc.cooldowns[option] = time
                doc.save()
            }
            
            return doc;
        }
        /**
         * 
         * @param {String} guildID - La ID de el servidor
         * @returns {object} - Devuelve el documento de mongoose
         */
        async getBackpack(guildid){
            if(!guildid)throw new Error('No incluiste la ID de el servidor')

            let find = await mineriaModel.findOne({guildID: guildid, userID: this.id})
            
            if(!find)return undefined;

            return find;
        }
        /**
         * 
         * @param {String} guildid - La id de el servidor
         * @param {String} mineral - Un mineral valido: piedra, carbon, hierro, diamante, esmeralda, zafiro, ruby, kalonsita
         * @param {Number} cantity - La cantidad de el mineral a ingresar
         */
        async setMineral(guildid, mineral, cantity){
            if(!guildid)throw new Error('No incluiste la ID de el servidor')
            if(!mineral)throw new Error(`Debes de incluir un mineral`)
            if(!cantity)throw new Error(`Debes de incluir la cantidad`)
            let minerals = ['piedra','carbon','hierro','diamante','esmeralda','zafiro','ruby','kalonsita']
            if(!minerals.includes(mineral))throw new Error(`Debes de incluir un mineral valido: ${minerals}`)
            if(cantity.isNaN)throw new Error(`La cantidad debe ser un numero`)

            let find = await mineriaModel.findOne({guildID: guildid, userID: this.id}), doc;
            
            if(!find){
                doc = new mineriaModel({guildID: guildid, userID: this.id})
                doc[mineral] = parseInt(cantity)
                doc.save()
            } else {
                doc = await mineriaModel.updateOne({guildID: guildid, userID: this.id}, {$inc: {[mineral]: parseInt(cantity)}}).catch(a=>{})
            }

            return doc;
        }
    }
}

