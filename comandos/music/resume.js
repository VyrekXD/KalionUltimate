const Discord = require('discord.js');

module.exports = {
aliases: [],
guildOnly: true,
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','CONNECT','SPEAK'],
run: async (client, message, args) => {

    return message.channel.send(`Comandos en construccion...`)
    
    if(!message.member.voice.channel) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | Debes estar en un canal de voz!` }})

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | No estas en mi canal de voz!`}});
  
    
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | No hay nada reproduciendose!` }})
    
    let song = await client.player.resume(message.guild.id);
              
    return message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.resume} | Reproduciendo!` }});
}
}

module.exports.help = {
name: 'resume',
description: 'Resume la cancion en donde la dejaste ',
cooldown: [1],
alias: [],
usage: 'resume',
example: 'resume'
}