const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')

module.exports.run = bot => {
  bot.on("guildBanRemove", async (guild, user) => {

    let consulta = await configModel.findOne({guildID: guild.id}).logsConfig
    if(!consulta)return
    if(!consulta.banRemove)return

    const e = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle(`__**Usuario Unbaneado**__`)
    .addField(`**Usuario***`, `${user.tag}\n${user.id}`, true)
    .setThumbnail(user.displayAvatarURL())
    if(user.bot === 'true'){
        e.setFooter(`El usuario desbaneado es un bot`)
      }
      if(guild.me.hasPermission('VIEW_AUDIT_LOGS')){
        let x = await guild.fetchAuditLogs()
        let u = x.entries.first()
        
        
        e.addField(`**Moderador**`, `${u.executor.tag}\n${u.executor.id}`, true)
    }
    log = await consulta.channelID
        
    let canal = bot.channels.cache.get(log)
    canal.send(e)
  })
}