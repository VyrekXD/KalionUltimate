const Discord = require('discord.js');
const moneyModel = require('../../../database/models/dinero');
const { checkPerms } = require(`../../../util/Functions/checkPermissions`)

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  run: async(client, message, args) => {
  
  
  
  if(!checkPerms(message.member, 'ADMINISTRATOR'))return message.channel.send(`No tienes permisos`)
  
  
  let user = message.mentions.users.first();
  let eleccion = args[0]
  let cantidad = args[1]

  if(!user)return message.channel.send(`A quien le quieres quitar dinero?`)
  

  let servidor = message.guild;
  let DbServidor = await moneyModel.findOne({servidor: servidor.id, usuario: user.id})
  
  if(!DbServidor){
    let nuevo = new moneyModel({servidor: servidor.id, usuario: user.id})
    nuevo.save()
  }
  if(!eleccion)return message.channel.send(`De donde le quieres quitar el dinero?`)
  
  if(parseInt(cantidad) < 0)return message.channel.send("Estas loco o quieres explotar el mundo? No puedes añadir esos numeros")
  
  if(!isNaN(cantidad))return message.channel.send(`Eso no es un numero`)
  

  const embed1 = new Discord.MessageEmbed()
  .setTitle('Dinero Removido')
  .setDescription(':white_check_mark: Removido :dollar: **'+ cantidad+ '** a '+ user.username)
  .setColor('0b861a')
  .setTimestamp()

  if(eleccion === "bank"){
     db.collection("dinero").updateOne({servidor: servidor.id, usuario: user.id}, {$inc: {banco: -parseInt(cantidad), dinerotot: -parseInt(cantidad)}})
    return message.channel.send(embed1)
    }
    if(eleccion === "money"){
       db.collection("dinero").updateOne({servidor: servidor.id, usuario: user.id}, {$inc: {dinero: -parseInt(cantidad), dinerotot: -parseInt(cantidad)}})
      return message.channel.send(embed1)
      }
}
}

module.exports.help = {
name: 'removemoney',
description: 'Remueve dinero siendo admin!',
cooldown: [],
alias: [],
usage: 'removemoney [bank/money] [Cantidad] [@Usuario]',
example: 'removemoney money 100 @NoobLance'
}