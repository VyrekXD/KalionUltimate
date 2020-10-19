const Discord = require('discord.js');

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS',"MANAGE_NICKNAMES"],
aliases: [],
guildOnly: true,
run: async (bot, message, args, send) => {

    if(!message.member.hasPermission("MANAGE_NICKNAMES"))return send('No tienes permisos') //lo que dice si no tiene permisos
    
    let user = message.mentions.members.first() || bot.guilds.members.resolve(args[0])

    if(!user)return send('No mencionaste a nadie')
    else if(persona.highestRole.comparePositionTo(message.member.highestRole) > 0)return send('No puedes cambiarle el nick a una persona que tiene un rol mayor a ti')
    
    let apodo = args.slice(1).join(' ')

    if(!apodo)return send('Debes de poner el nuevo nick')

    user.setNickname(apodo)

    send(`El nuevo apodo de ${user} es ${apodo}`)
    }
}

module.exports.help = {
name: 'nickname',
description: 'Cambia el nick de otra persona',
cooldown: [],
alias: [],
usage: 'nickname [user] [name]',
example: 'nickname @KalionUltimate SuperGay'
}