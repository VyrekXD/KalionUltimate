const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')

module.exports.run = (bot, boost) => {

    let find = (await configModel.findOne({guildID: boost.guild.id}))
    if(!find)return;
    find = find.logsConfig
    if(!find.guildBoostRemove)return

    const e = new Discord.MessageEmbed()
    .setTitle('__**Servidor Boosteado**__')
    .addField(`**Boosts**`, `${boost.oldBoost} => ${boost.newBoost}`)
    .setColor('RED')

    log = await find.channelID
        
    let canal = bot.channels.cache.get(log)
    if(!canal)return;
    canal.send(e)

}