const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')

module.exports.run = (bot, invite) => {

    let find = (await configModel.findOne({guildID: invite.guild.id}))
    if(!find)return;
    find = find.logsConfig
    if(!find.inviteCreate)return

    const e = new Discord.MessageEmbed()
    .setTitle('__**Invitacion Creada**__')
    .addField(`Creador:`, invite.inviter.tag || "Autor desconocido")
    .addField(`URL:`, invite.url)
    .addField(`Codigo De La Invitacion:`, invite.code)
    .addField(`Canal:`, invite.channel)
    .setColor(`06b333`)

    log = await find.channelID
        
    let canal = bot.channels.cache.get(log)
    if(!canal)return;
    canal.send(e)

}