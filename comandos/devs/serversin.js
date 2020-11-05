const Discord = require('discord.js');
const devModel = require('../../database/models/developers')

module.exports.run = async(client, message, args) => {

  let consulta = await devModel.findOne({userID: message.author.id})

  if(!consulta)return message.channel.send(`Solo **Developers** pueden usar este comando!`)

  const e = new Discord.MessageEmbed()
  .setTitle(`${message.author.tag}, Estos son los servers en donde estoy`)
  .setDescription('```'+ client.guilds.cache.first(30).map(r => 'Nombre: ' + r.name + '\nID: ' + r.id + '\n').join("\n") + '```')
  .setColor("RANDOM")
  
  
  message.channel.send(e)
}

module.exports.help = {
  name: 'serversin',
  aliases: [],
}