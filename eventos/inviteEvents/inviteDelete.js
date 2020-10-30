const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')

module.exports.run = bot => {
  bot.on("inviteDelete", async invite => {

    let find = await (configModel.findOne({guildID: invite.guild.id})).logsConfig
    if(!find)return
    if(!find.inviteDelete)return

    const e = new Discord.MessageEmbed()
    .setTitle('__**Invitacion Eliminada**__')
    .addField(`URL:`, invite.url)
    .addField(`Codigo De La Invitacion:`, invite.code)
    .addField(`Canal:`, invite.channel)
    .setColor(`ca1313`)

    log = await find.channelID
        
    let canal = bot.channels.cache.get(log)
    canal.send(e)
  })
}