const Discord = require('discord.js');
const moment = require('moment')
const configModel = require('../../database/models/guildConfig')

module.exports.run = bot => {
  bot.on("guildMemberAdd", async member => {

    let find = (await configModel.findOne({guildID: member.guild.id})).logsConfig
    if(!find)return
    if(!find.memberAdd)return

    const e = new Discord.MessageEmbed()
    .setColor("#37ff00")
    .setTitle(`__**Miembro Entro Al Servidor**__`)
    .addField(`**Usuario**`, `${member.user.tag}\n${member.id}`, true)
    .addField(`**Fecha De Ingreso**`, `${moment(member.joinedAt).format("MMM Do YY")}\n${moment(member.joinedAt).format('h:mm:ss a')} UTC`, true)
    .addField(`**Edad de la cuenta**`, `${moment(member.user.createdAt).format("MMM Do YY")}\n${moment(member.user.createdAt).format('h:mm:ss a')}`, true)
    .addField(`**Miembros**`, member.guild.memberCount, true)
    .setThumbnail(member.user.displayAvatarURL())
    


    log = await find.channelID
        
    let canal = bot.channels.cache.get(log)
    if(!canal)return;
    canal.send(e)
})
}