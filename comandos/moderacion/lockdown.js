const Discord = require('discord.js');

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','ADMINISTRATOR'],
aliases: [],
guildOnly: true,
run: async (bot, message, args, send) => {

    if(!message.member.permissions.has("ADMINISTRATOR"))return send('Permisos insuficientes');

    let ex = args[0].toLowerCase()
    const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');

    if(ex === 'on'){
        channels.forEach(async channel => {
            await channel.updateOverwrite(message.guild.roles.everyone, { 
                SEND_MESSAGES: false
            })
        })

        send(`Todos los canales han sido bloqueados!`)
    }else if(ex === 'off'){
        channels.forEach(async channel => {
            await channel.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: true
            })
        })

        send(`Todos los canales han sido desbloqueados`)
    }else {
        send('Parametro invalido')
    }


}
}

module.exports.help = {
name: 'lockdown',
description: 'Bloquea todos los canales de el servidor :O',
cooldown: [],
alias: [],
usage: 'lockdown on',
example: 'lockdown off'
}