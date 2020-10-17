const Discord = require('discord.js')
const warnModel = require('../../database/models/warns')
const moment = require('moment')
const { checkPerms } = require('../../util/Functions/checkPermissions')

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  run: async(client, message, args) => {

    let memberx = message.mentions.members.first() ||
    message.guild.members.cache.get(args[0])

    let servidorr = message.guild
  
  
    if(!checkPerms(message.member, 'KICK_MEMBERS'))return message.channel.send(`Permisos insuficientes`) 

    if(!memberx)return message.channel.send("No mencionaste ningun miembro")
    
    if(memberx.roles.highest.comparePositionTo(message.member.roles.highest) > 0 ) return message.channel.send(`No puedes warnear a alguien mayor de tu rango`)


    let razon = args.slice(1).join(" ") || "Sin razón";

    let horamin = moment().format('LT')
    let fechad = moment().format('LL')

    let autor = message.author
    const e = new Discord.MessageEmbed()
    .setTitle(`**Miembro Warneado**`)
    .setDescription(`**${autor.tag} ha warneado a ${memberx.user.tag}, ${razon}**`)
    .setFooter("El miembro warneado recibira un mensaje sobre el warn")
    .setColor("#FF0000")
    message.channel.send(e)

    const member1 = client.users.cache.get(memberx.id)

    const e1 = new Discord.MessageEmbed()
    .setTitle(`**Warn**`)
    .setDescription(`Has sido warneado en ${servidorr} por el moderador ${autor.tag} (${autor.id}) por la razon, ${razon}`)
    .setColor("#FF0000")

    await member1.send(e1).catch(() => {
      message.channel.send(`Hubo un error al avisarle al usuario warneado por MD`)
    })
    let nuevo = new warnModel({
      servidor: servidorr.id,
      targetid: memberx.user.id,
      target: {
        username: memberx.user.username,
        id: memberx.user.id,
        discriminator: memberx.user.discriminator
      },
      mod: {
        username: autor.username,
        id: autor.id,
        discriminator: autor.discriminator
      },
      raz: razon,
      tiempo: `${horamin}, ${fechad}`
    })
    nuevo.save()
}
}