const Discord = require('discord.js');
const configModel = require('../../database/models/guildConfig')
const snipeModel = require('../../database/models/snipes')

module.exports.run = bot => {
  bot.on("messageDelete", async message => { 

  if(message.channel.type === "dm")return
  if(!message.content)return

  let consultaSnipe = await snipeModel.findOne({servidor: message.guild.id})
  if(consultaSnipe){
    await snipeModel.updateOne({servidor: message.guild.id}, {$set: {mensaje: message.content, hora: message.createdTimestamp, usuario: message.author.id}})
  }else {
    let nuevo = new snipeModel({usuario: message.author.id, servidor: message.guild.id, mensaje: message.content, hora: message.createdTimestamp})
    nuevo.save()
  }

  let consulta = await configModel.findOne({guildID: message.guild.id}).logsConfig
  if(!consulta)return
  if(!consulta.messageDelete)return

  
  const efe = new Discord.MessageEmbed()
  .setTitle("__**Mensaje eliminado**__")
  .setColor("ac0d0d")
  .addField("Autor: ", message.author.tag + '\n'+ message.author.id, true)
  .addField("El canal donde fue eliminado: ", message.channel, true)
  .addField("Mensaje Borrado:", message.content);
  
  
  
  log = await consulta.channelID
        
  let canal = bot.channels.cache.get(log)
  canal.send(e)

  })
}
