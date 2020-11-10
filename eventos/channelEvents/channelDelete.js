const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')

module.exports.run = async(bot, channel) => {

  if (channel.type === "dm") return;

  let find = (await configModel.findOne({guildID: channel.guild.id}))
  if(!find)return;
  find = find.logsConfig
  if(!find.channelDelete)return

  let tipo = {
    "text":"Texto",
    "voice":"Voz"
  }
  const embed = new Discord.MessageEmbed()
  .setTitle("__**Canal Eliminado**__")
  .setColor("#ac0d0d")
  .addField("Canal", `${channel.name}\n${channel.id}`, true)
  if(channel.parent){
    embed.addField(`Categoria`, `${channel.parent}\n${channel.parent.id}`, true)
  }

  if(channel.guild.me.hasPermission('VIEW_AUDIT_LOGS')){
  const log = await channel.guild.fetchAuditLogs({
    limit: 1,
    type: 12
    });
    const entry = log.entries.first()
    embed.addField(`Moderador`, `${entry.executor.tag}\n${entry.executor.id}`, true)
  }
    
  
  
  embed.addField(`Tipo`, tipo[channel.type])

    log = find.channelID
        
    let canal = bot.channels.cache.get(log)
    if(!canal)return;
    canal.send(e)
      
}