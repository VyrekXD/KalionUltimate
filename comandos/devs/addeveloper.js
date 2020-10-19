const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const devModel = require('../../database/models/developers')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
run: async (bot, message, args, send) => {

    let consulta = await devModel.findOne({userID: message.author.id})

    if(!consulta)return message.channel.send(`Solo **Developers** pueden usar este comando!`)
    

    let user2 = message.mentions.users.first()

    if(!user2)return message.channel.send(`Necesitas mencionar a alguien!`)
    
    let find2 = await devModel.findOne({userID: user2.id})
    
    if(find2)return message.channel.send(`El mencionado ya es developer!`)
    

    const embed = new Discord.MessageEmbed()
    .setTitle(`<:dev:733445890609512478> Nuevo Developer!`)
    .setColor(`GREEN`)
    .setDescription(`<:dev:733445890609512478> El nuevo developer es:\nUsuario: ${user2}\nUsuario Tag: ${user2.tag}\nID: ${user2.id}`)
    .setFooter(`Comando ejecutado por ${usuario.username}`)
    .setTimestamp()
    
    message.channel.send(embed)

    let nuevo = await new devModel({userID: user2.id})
    nuevo.save()
    }
}