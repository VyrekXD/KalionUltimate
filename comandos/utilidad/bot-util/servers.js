const Discord = require('discord.js');
const devModel = require('../../../database/models/developers')

module.exports.run = async(bot, message, args, send) => {

  let consulta = await devModel.findOne({userID: message.author.id})

  if(!consulta){
    const ee = new Discord.MessageEmbed()
    .setColor('RED')
    .setDescription(`Estoy en ${bot.guilds.cache.size} servidores, ${bot.users.cache.size} usuarios y ${bot.channels.cache.size} canales`)

    return send(ee)

  }

  let totg = bot.guilds.cache.sort(function(a, b) {
    return b.memberCount - a.memberCount;
  })
  let m = ['🥇','🥈','🥉','4.','5.']

  
  const e = new Discord.MessageEmbed()
  .setTitle(`Servidores TOP`)
  .setDescription(totg.first(5).map((r, i) => m[i] + r.name +': '+ r.memberCount))
  .setColor("RED")
  
  
  send(e)
}

module.exports.help = {
  name: 'serversin',
  aliases: [],
}