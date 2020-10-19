const Discord = require('discord.js');
const moneyModel = require('../../../database/models/dinero')
const { checkPerms } = require(`../../../util/Functions/checkPermissions`)

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  guildOnly: true,
  run: async(client, message, args) => {
  

  if(!checkPerms(message.member, 'ADMINISTRATOR'))return message.channel.send(`Permisos insuficientes`)
  
  let user = message.mentions.users.first();
  let eleccion = args[0]
  let cantidad = args[1]

  if(!user)return message.channel.send(`No mencionaste a nadie`)

  let DbServidor = await moneyModel.findOne({servidor: message.guild.id, usuario: user.id})
  
  if(!eleccion)return message.channel.send(`Debes elegir una opcion si bank o money!`)
  if(parseInt(cantidad) < 0)return message.channel.send("Estas loco o quieres explotar el mundo? No puedes añadir esos numeros")
  
  if(!isNaN(cantidad))return message.channel.send(`Numero incorrecto`)
  
  if(!DbServidor){
    let nuevo = await new moneyModel({servidor: message.guild.id, usuario: user.id})
    nuevo.save()
  }
  const embed1 = new Discord.MessageEmbed()
  .setTitle('Dinero añadido')
  .setDescription(':white_check_mark: Añadido :dollar: **'+ cantidad+ '** a '+ user.username)
  .setColor('0b861a')
  .setTimestamp()
  if(eleccion === "bank"){
    await moneyModel.updateOne({servidor: servidor.id, usuario: user.id}, {$inc: {banco: parseInt(cantidad), dinerotot: parseInt(cantidad)}})
    return message.channel.send(embed1)
    }
    if(eleccion === "money"){
      await moneyModel.updateOne({servidor: servidor.id, usuario: user.id}, {$inc: {dinero: parseInt(cantidad), dinerotot: parseInt(cantidad)}})
      return message.channel.send(embed1)
      }

    }
  }
module.exports.help = {
name: 'addmoney',
description: 'Añade dinero siendo admin!',
cooldown: [],
alias: [],
usage: 'addmoney [@usuario] [cantidad]',
example: 'addmoney @NoobLance 10000'
}