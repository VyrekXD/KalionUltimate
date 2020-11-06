const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')

module.exports.run = async(bot, guild, user) => {

    let find = (await configModel.findOne({guildID: guild.id}))
    if(!find)return;
    find = find.logsConfig
    if(!find.banRemove)return

    const e = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle(`__**Usuario Unbaneado**__`)
    .addField(`**Usuario***`, `${user.tag}\n${user.id}`, true)
    .setThumbnail(user.displayAvatarURL())
    if(user.bot === 'true'){
        e.setFooter(`El usuario desbaneado es un bot`)
      }
      if(guild.me.hasPermission('VIEW_AUDIT_LOG')){
        let x = await guild.fetchAuditLogs()
        let u = x.entries.first()
        
        
        e.addField(`**Moderador**`, `${u.executor.tag}\n${u.executor.id}`, true)
    }
    log = await find.channelID
        
    let canal = bot.channels.cache.get(log)
    if(!canal)return;
    canal.send(e)

}