const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')

module.exports.run = bot => {
  bot.on("guildBoostRemove", async boost => {

    let find = await configModel.findOne({guildID: boost.guild.id}).logsConfig

    if(!find.status)return 
    if(!find.guildBoostRemove)return

    const e = new Discord.MessageEmbed()
    .setTitle('__**Servidor Boosteado**__')
    .addField(`**Boosts**`, `${boost.oldBoost} => ${boost.newBoost}`)
    .setColor('RED')

    log = await consulta.channelID
        
    let canal = bot.channels.cache.get(log)
    canal.send(e)
  })
}