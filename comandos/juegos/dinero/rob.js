const Discord = require('discord.js');
const moneyModel = require('../../../database/models/dinero')
const { milisegFromMinutes } = require('../../../util/Functions/convertTime')
const used = new Map();

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {

    let user = message.author
    let user1 = message.mentions.users.first();

    if(!user1)return message.channel.send(`Necesitas mencionar a alguien`)
    if(user1.bot)return message.channel.send(`No puedes robarle a los bots ellos te superan en poder B)`)
    if(user1 === user)return message.channel.send(`No te puedes robar a ti mismo`)

    let servidor = message.guild;

    let DbServidor = await moneyModel.findOne({servidor: servidor.id, usuario: user.id})
    let DbServidor1 = await moneyModel.findOne({servidor: servidor.id, usuario: user1.id})

    if(!DbServidor){
        let nuevo = new moneyModel({servidor: servidor.id, usuario: user.id})
        nuevo.save()
    }
    if(!DbServidor1){
        let nuevo = new moneyModel({servidor: servidor.id, usuario: user1.id})
        nuevo.save()
    }
    if(DbServidor1.dinero === 0)return message.channel.send(`No puedes robarle dinero a un usuario que no tiene dinero`)

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

            let randdi  = Math.floor(Math.random() * (DbServidor1.dinero / 2))
            let rand  = Math.floor(Math.random() * 100)
            let randii = Math.floor(Math.random() * (DbServidor.dinero / 2))
    
            if(rand < 40){
                const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setTitle(`Comando Robar`)
                .setDescription(`:white_check_mark: Lograste robarle exitosamente a ${user1.tag} le robaste: :dollar: **${randdi}** `)
                .setFooter('Comando Rob Exitoso')
                .setTimestamp()
                .setColor('0b861a')
                message.channel.send(embed)
    
                await moneyModel.updateOne({servidor: servidor.id, usuario: user.id}, {$inc: {dinero: parseInt(randdi), dinerotot: parseInt(randdi)}})
                await moneyModel.updateOne({servidor: servidor.id, usuario: user1.id}, {$inc: {dinero: -parseInt(randdi), dinerotot: -parseInt(randdi)}})
            }
            if(rand > 41){
                const embed1 = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setTitle(`Comando Robar`)
                .setDescription(`:x: No has logrado robar nada y te pusieron una multa de :dollar: **${randii}**`)
                .setFooter('Comando Rob Fallido')
                .setTimestamp()
                .setColor('a80808')
                message.channel.send(embed1)
    
                await moneyModel.updateOne({servidor: servidor.id, usuario: user.id}, {$inc: {dinero: -parseInt(randdi), dinerotot: -parseInt(randdi)}})
            }
            used.set(message.author.id, Date.now() + milisegFromMinutes(50));
            setTimeout(()=> used.delete(message.author.id), milisegFromMinutes(50));
      }
        

    }
        
}
module.exports.help = {
name: 'rob',
description: 'Roba a alguien >:)',
cooldown: [50],
alias: [],
usage: 'rob [@usuario]',
example: 'rob @NoobLance'
}
