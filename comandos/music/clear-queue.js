const Discord = require('discord.js');

module.exports = {
aliases: ['clearqueue'],
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','CONNECT','SPEAK'],
run: async (client, message, args) => {
 
    
    if(!message.member.voice.channel) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | Debes estar en un canal de voz!` }})

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | No estas en mi canal de voz!`}});
  
    
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | No hay nada reproduciendose!` }})
  
    client.player.clearQueue(message.guild.id);
  
    return message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.success} | Cola de canciones vacia!` }});
    }
}

module.exports.help = {
name: 'clear-queue',
description: 'Limpia la cola de canciones',
cooldown: [1],
alias: ['clearqueue'],
usage: 'clearqueue',
example: 'clearqueue'
}