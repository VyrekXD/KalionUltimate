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
      let elec = Math.floor(Math.random() * 100)
      let op = DbServidor.dinerotot * 2
      let op2 = DbServidor / 2
      let randomdin = Math.floor(Math.random() * op);
      let randomin2 = Math.floor(Math.random() * op2)
  
      if(elec === 0){
          elec = 1
      }
      if(elec > 41){
          const embed2 = new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setTitle(`**Comando Crime**`)
          .setDescription("Te atraparon en el crimen y perdiste :dollar: "+ randomin2)
          .setColor("10aa6d")
    
      
      
      if(DbServidor){
      await moneyModel.updateOne({servidor: servidor.id, usuario: usuario.id}, {$inc: {dinero: -parseInt(randomin2), dinerotot: -parseInt(randomin2)}})
    }
      message.channel.send(embed2)
      }
      if(elec < 40){
          const embed1 = new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setTitle(`**Comando Crime**`)
          .setDescription("Lograste hacer un crimen y obtuviste :dollar: "+ randomdin)
          .setColor("10aa6d")
    
      
      
      
      await moneyModel.updateOne({servidor: servidor.id, usuario: usuario.id}, {$inc: {dinero: parseInt(randomdin), dinerotot: parseInt(randomdin)}})
    
      message.channel.send(embed1)
      }

		  used.set(message.author.id, Date.now() + milisegFromMinutes(40));
		  setTimeout(()=> used.delete(message.author.id), milisegFromMinutes(40));
    }



}
}

module.exports.help = {
name: 'crime',
description: 'Has un crimen',
cooldown: [],
alias: [],
usage: 'crime',
example: 'crime'
}