const Discord = require('discord.js');
const moneyModel = require('../../../database/models/dinero')
const { milisegFromMinutes } = require('../../../util/Functions/convertTime')
const used = new Map();

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  run: async(client, message, args) => {

  let usuario = message.author
  
  let servidor = message.guild;
  let DbServidor = await moneyModel.findOne({servidor: servidor.id, usuario: usuario.id})

    
  const Duration = require("humanize-duration");
	if (used.has(message.author.id)) { 
    const cooldown = used.get(message.author.id);          
		 const remaining = Duration(cooldown - Date.now(), { units: ['h','m','s'], language: 'es', conjunction: ' y ', serialComma: false, round: true});
		 return message.channel.send(`Necesitas esperar ${remaining} para volver a usar este comando`).then(async(msg) => {
			  setTimeout(() => {
			  msg.delete();
			}, 5000)
			});  
		 }
		else{


      let randomdin = Math.floor(Math.random() * 250) + 1;

      const embed1 = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setTitle(`**Comando Work**`)
      .setDescription("Tu trabajaste y obtuviste :dollar: "+ randomdin)
      .setColor("10aa6d")

      message.channel.send(embed1)
      if(DbServidor){
        await moneyModel.updateOne({servidor: servidor.id, usuario: usuario.id}, {$inc: {dinero: parseInt(randomdin), dinerotot: parseInt(randomdin)}}) 
        }else{ 
let nuevo = new moneyModel({servidor: servidor.id, usuario: usuario.id, dinero: parseInt(randomdin), dinerotot: parseInt(randomdin)})
nuevo.save()
        }
    
  
		  used.set(message.author.id, Date.now() + milisegFromMinutes(20));
		  setTimeout(()=> used.delete(message.author.id), milisegFromMinutes(20));
    }
    }
  }

module.exports.help = {
name: 'work',
description: 'Trabaja flojo >:(',
cooldown: ['20'],
alias: [],
usage: 'work',
example: 'work'
}