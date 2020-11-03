const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')

module.exports.run = async(bot, invite) => {

    let find = (await configModel.findOne({guildID: invite.guild.id}))
    if(!find)return;
    find = find.logsConfig
    if(!find.inviteDelete)return

    const e = new Discord.MessageEmbed()
    .setTitle('__**Invitacion Eliminada**__')
    .addField(`URL:`, invite.url)
    .addField(`Codigo De La Invitacion:`, invite.code)
    .addField(`Canal:`, invite.channel)
    .setColor(`ca1313`)

    log = await find.channelID
        
    let canal = bot.channels.cache.get(log)
    if(!canal)return;
    canal.send(e)

}