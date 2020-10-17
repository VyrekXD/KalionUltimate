const Discord = require('discord.js')
const mongoose = require('mongoose');
const warnModel = require('../../database/models/warns')
const { checkPerms } = require('../../util/Functions/checkPermissions')

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  run: async(client, message, args) => {

  if(!checkPerms(message.member, 'ADMINISTRATOR'))return message.channel.send(`Permisos insuficientes`)

  let servidorr = message.guild

  let docid = args[0]

  if(!docid)return message.channel.send(`Necesitas poner una id valida!`)

  if(!mongoose.isValidObjectId(docid))return message.channel.send(`Necesitas poner una id valida!`)

  let consulta = await warnModel.findById(docid)
  
  if(!consulta)return message.channel.send("Ocurrio un error, quiza no haya ningun warn con esa id.")
    
  if(consulta.servidor !== servidorr.id)return message.channel.send("Ocurrio un error, quiza no haya ningun warn con esa id.")

  const e = new Discord.MessageEmbed()
  .setColor(`BLUE`)
  .setDescription(`Warn eliminado para ${consulta.target.username}#${consulta.target.discriminator} (${consulta.target.id})`)
  message.channel.send(e)
  await warnModel.findByIdAndDelete(docid)
}
}