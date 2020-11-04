const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const devModel = require('../../database/models/developers')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
guildOnly: true,
run: async (bot, message, args, send) => {

    let consulta = await devModel.findOne({userID: message.author.id})

    if(!consulta)return send(`Solo **Developers** pueden usar este comando!`)
    

    let user2 = message.mentions.users.first()

    if(!user2)return send(`Necesitas mencionar a alguien!`)
    
    let find2 = await devModel.findOne({userID: user2.id})
    
    if(!find2)return send(`El mencionado no es developer!`)
    

    const embed = new Discord.MessageEmbed()
    .setTitle(`<:dev:733445890609512478> Developer Eliminado!`)
    .setColor(`RED`)
    .setDescription(`<:dev:733445890609512478> El developer era:\nUsuario: ${user2}\nUsuario Tag: ${user2.tag}\nID: ${user2.id}`)
    .setFooter(`Comando ejecutado por ${user2.username}`)
    .setTimestamp()
    
    send(embed)

    await devModel.deleteOne({userID: user2.id})
    }
}
