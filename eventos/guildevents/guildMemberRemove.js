const Discord = require('discord.js');
const a = new Date().toLocaleDateString()
const configModel = require('../../database/models/guildConfig')

module.exports.run = bot => {
  bot.on("guildMemberRemove", async member => {

    let find = (await configModel.findOne({guildID: member.guild.id}))
    if(!find)return;
    find = find.logsConfig
    if(find.automodConfig.evasiveMute === true){

      let rol = member.guild.roles.find(r => r.name == "Muted")
      if(member.roles.has(rol.id)) {
        member.ban("Evasive Mute (Automatico)")

        if(find.logsConfig.evasiveMute === true){
          const embed = new Discord.RichEmbed()
          .setAuthor("Ban automático")
          .addField("**Usuario**", `${member.tag}\n${member.id}`, true)
          .addField("**Razón**", `Evasive Mute (Automatico)`, true)
          .setColor("RANDOM")
          .setThumbnail(member.user.displayAvatarURL())

          log = await find.logsConfig.channelID
          bot.channels.cache.get(log).send(e)
          
        }
      }
    }
    
    if(!find.logsConfig.memberRemove)return

    const e = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle(`__**Miembro Abandono El Servidor**__`)
    .addField(`**Usuario**`, `${member.user.tag}\n${member.id}`, true)
    .addField(`**Fecha**`, a, true)
    .addField(`**Miembros**`, member.guild.memberCount, true)
    .setThumbnail(member.user.displayAvatarURL())
    
    

    log = await find.logsConfig.channelID
        
    let canal = bot.channels.cache.get(log)
    if(!canal)return;
    canal.send(e)

})
}