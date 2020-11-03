const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')

module.exports.run = async(bot, oldMessage, newMessage) => {

    await oldMessage.fetch()
    await newMessage.fetch()
    
    if(newMessage.channel.type === "dm")return
    if(newMessage.author.bot) return;

    let find = (await configModel.findOne({guildID: oldMessage.guild.id}))
    if(!find)return;
    find = find.logsConfig
    if(!find.messageUpdate)return;

    const e = new Discord.MessageEmbed()
    .setColor(`BLUE`)
    .setTitle(`__**Mensaje Editado**__`)
    .addField(`**Usuario**`, `${newMessage.author.tag}\n${newMessage.author.id}`)
    .addField(`**Mensaje Antiguo**`, oldMessage.content || 'Vacio')
    .addField(`**Mensaje Nuevo**`, newMessage.content || 'Vacio')
 
    log = await find.channelID
        
    bot.channels.cache.get(log)

    let canal = bot.channels.cache.get(log)

    if(!canal)return;

    canal.send(e)
  
} 