const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const devModel = require('../../database/models/developers')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: ['dev'],
guildOnly: true,
run: async (bot, message, args, send) => {

    let consulta = await devModel.findOne({userID: message.author.id})

    if(!consulta)return message.channel.send(`Solo **Developers** pueden usar este comando!`)
    
    if(!args[0])return send(`Debes de describir la accion: [add/rm]`)

    if(args[0].toLowerCase() === 'add'){

        let user2 = message.mentions.users.first() || bot.users.resolve(args[1])

        if(!user2)return message.channel.send(`Necesitas mencionar a alguien!`)
        
        let find2 = await devModel.findOne({userID: user2.id})
        
        if(find2)return message.channel.send(`El mencionado ya es developer!`)
        
    
        const embed = new Discord.MessageEmbed()
        .setTitle(`<:dev:698308735495569489> Nuevo Developer!`)
        .setColor(`GREEN`)
        .setDescription(`<:dev:698308735495569489> El nuevo developer es:\nUsuario: ${user2}\nUsuario Tag: ${user2.tag}\nID: ${user2.id}`)
        .setFooter(`Comando ejecutado por ${message.author.username}`)
        .setTimestamp()
        
        message.channel.send(embed)
    
        let nuevo = await new devModel({userID: user2.id})
        nuevo.save()
    } else if(args[0].toLowerCase() === 'rm' || args[0].toLowerCase() === 'remove' || args[0].toLowerCase() === 'rem') {

        let user2 = message.mentions.users.first()

        if(!user2)return send(`Necesitas mencionar a alguien!`)
        
        let find2 = await devModel.findOne({userID: user2.id})
        
        if(!find2)return send(`El mencionado no es developer!`)
        
        const embed = new Discord.MessageEmbed()
        .setTitle(`<:dev:698308735495569489> Developer Eliminado!`)
        .setColor(`RED`)
        .setDescription(`<:dev:698308735495569489> El developer era:\nUsuario: ${user2}\nUsuario Tag: ${user2.tag}\nID: ${user2.id}`)
        .setFooter(`Comando ejecutado por ${message.author.username}`)
        .setTimestamp()
        
        send(embed)
    
        await devModel.deleteOne({userID: user2.id})
    }

    }
}

module.exports.help = {
name: 'developer',
aliases: ['dev']
}