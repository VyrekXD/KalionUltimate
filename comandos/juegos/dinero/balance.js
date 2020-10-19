const Discord = require('discord.js');
const moneyModel = require('../../../database/models/dinero')


  module.exports = {
    aliases: ['bal'],
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {
      
      let usuario = message.mentions.users.first()
      if(!usuario)usuario = message.author;
      
      let servidor = message.guild;
      let DbServidor = await moneyModel.findOne({servidor: servidor.id, usuario: usuario.id})
    
      if(!DbServidor){
      let nuevo = await new moneyModel({servidor: servidor.id, usuario: usuario.id})
      nuevo.save()
      }

          const embed1 = new Discord.MessageEmbed()
          .setAuthor(usuario.tag, usuario.displayAvatarURL())
          .setColor("9562e2")
          .addField('Bolso:', ':dollar:'+DbServidor.dinero, true)
          .addField('Banco:', ':dollar:'+DbServidor.banco, true)
          .addField('Dinero Total:', ':dollar:'+DbServidor.dinerotot, true)
          .setTimestamp()
          
          message.channel.send(embed1)}
        }


module.exports.help = {
name: 'balance',
description: 'Consulta tu dinero',
cooldown: [],
alias: ['bal'],
usage: 'bal (usuario)',
example: 'bal @NoobLance'
}