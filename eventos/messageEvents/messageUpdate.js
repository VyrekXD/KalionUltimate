const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')

module.exports.run = bot => {
  bot.on("messageUpdate", async (oldMessage, newMessage) => {

    if(newMessage.channel.type === "dm")return
    if(oldMessage.author.bot) return;

    let find = await configModel.findOne({guildID: oldMessage.guild.id}).logsConfig
    if(!find)return
    if(!find.messageUpdate)return

    const e = new Discord.MessageEmbed()
    .setColor(`BLUE`)
    .setTitle(`__**Mensaje Editado**__`)
    .addField(`**Usuario**`, `${newMessage.author.tag}\n${newMessage.author.id}`)
    .addField(`**Mensaje Antiguo**`, oldMessage.content || 'Vacio')
    .addField(`**Mensaje Nuevo**`, newMessage.content || 'Vacio')
 
    log = await find.canals
        
    bot.channels.cache.get(log)
    let canal1 = bot.channels.cache.get(log)
    canal1.send(e)
  })
}