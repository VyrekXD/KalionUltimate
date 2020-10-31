const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')
const snipeModel = require('../../database/models/snipes')

module.exports.run = bot => {
  bot.on("messageDelete", async message => { 

  if(message.channel.type === "dm")return
  if(!message.content)return

  let findSnipe = (await snipeModel.findOne({servidor: message.guild.id}))
  if(findSnipe){
    await snipeModel.updateOne({servidor: message.guild.id}, {$set: {mensaje: message.content, hora: message.createdTimestamp, usuario: message.author.id}})
  }else {
    let nuevo = new snipeModel({usuario: message.author.id, servidor: message.guild.id, mensaje: message.content, hora: message.createdTimestamp})
    nuevo.save()
  }

  let find = (await configModel.findOne({guildID: message.guild.id}))
  if(!find)return;
  find = find.logsConfig
  if(!find.messageDelete)return;

  
  const e = new Discord.MessageEmbed()
  .setTitle("__**Mensaje eliminado**__")
  .setColor("ac0d0d")
  .addField("Autor: ", message.author.tag + '\n'+ message.author.id, true)
  .addField("El canal donde fue eliminado: ", message.channel, true)
  .addField("Mensaje Borrado:", message.content);
  
  
  
  log = find.channelID
        
  let canal = bot.channels.cache.get(log)
  if(!canal)return;
  canal.send(e)

  })
}
