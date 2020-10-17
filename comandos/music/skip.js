const Discord = require('discord.js');

module.exports = {
aliases: ['s'],
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','CONNECT','SPEAK'],
run: async (client, message, args) => {
 

    
    if(!message.member.voice.channel) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | Debes estar en un canal de voz!` }})

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | No estas en mi canal de voz!`}});
  
    
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | No hay nada reproduciendose!` }})
    
    let song = await client.player.skip(message.guild.id);
  
    return message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.success} | Salteada:\n${song.name}` }});
}
}

module.exports.help = {
name: 'skip',
description: 'Siguiente cancion',
cooldown: [1],
alias: [],
usage: 'skip',
example: 'skip'
}