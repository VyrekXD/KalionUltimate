const Discord = require('discord.js');
const devModel = require('../../database/models/developer')

module.exports.run = async(client, message, args) => {

    let consulta = await devModel.findOne({developer: message.author.id})

    if(!consulta){
        return message.channel.send(`Solo **Developers** pueden usar este comando!`)
    }

    let usuario2 = message.mentions.users.first()

    if(!usuario2){
        return message.channel.send(`Necesitas mencionar a alguien!`)
    }

    let consulta2 = await devModel.findOne({developer: usuario2.id})
    
    if(consulta2){
        return message.channel.send(`El mencionado ya es developer!`)
    }

    const embed = new Discord.MessageEmbed()
    .setTitle(`<:dev:733445890609512478> Nuevo Developer!`)
    .setColor(`GREEN`)
    .setDescription(`<:dev:733445890609512478> El nuevo developer es:\nUsuario: ${usuario2}\nUsuario Tag: ${usuario2.tag}\nID: ${usuario2.id}`)
    .setFooter(`Comando ejecutado por ${usuario.username}`)
    .setTimestamp()
    
    message.channel.send(embed)

    let nuevo = await new devModel({developer: usuario2.id})
    nuevo.save()
}