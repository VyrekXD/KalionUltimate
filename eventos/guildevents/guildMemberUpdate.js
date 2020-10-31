const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')

module.exports.run = bot => {
  bot.on("guildMemberUpdate", async (oldMember, newMember) => {

    let find = (await configModel.findOne({guildID: newMember.guild.id})).logsConfig
    if(!find)return
    if(!find.memberUpdate)return
    
    const e = new Discord.MessageEmbed()
    .setColor("#1291af")
    .setTitle(`__**Miembro Actulizado**__`)
    .addField(`**Usuario**`, `${newMember.user.tag}\n${newMember.user.id}`, true)
    .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))

    if(oldMember.nickname !== newMember.nickname){
            e.addField(`**Nickname**`, `${oldMember.nickname} ==> ${newMember.nickname}`, true)
        
    }
    if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
      const fetchedLogs = await newMember.guild.fetchAuditLogs({ type: "MEMBER_ROLE_UPDATE", limit: 1 })
      const executor = fetchedLogs.entries.first();

      if (!executor) return;

      const e = new Discord.MessageEmbed()
      .setColor("#1291af")
      .setTitle(`__**Roles Agregados/Removidos**__`)
      .addField(`**Usuario**`, `${newMember.user.tag}\n${newMember.user.id}`, true)
      .addField(`**Moderador**`, `${executor.executor.tag}\n${executor.executor.id}`, true)
      .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
      if(oldMember.roles.cache.size < newMember.roles.cache.size){
        e.addField(`**Roles Agregados**`, `<@&${executor.changes[0].new[0].id}>\n${executor.changes[0].new[0].id}`, true)
      }else{
        e.addField(`**Roles Removidos**`, `<@&${executor.changes[0].new[0].id}>\n${executor.changes[0].new[0].id}`, true)
      }
      log = await find.channelID
        
      let canal = bot.channels.cache.get(log)
      canal.send(e)
    }

    if(e.fields.length === 1)return
    log = await find.channelID
        
    let canal = bot.channels.cache.get(log)
    if(!canal)return;
    canal.send(e)
  })
}