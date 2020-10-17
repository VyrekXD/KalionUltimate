const Discord = require('discord.js');

module.exports = {
aliases: [],
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','CONNECT','SPEAK'],
run: async (client, message, args) => {
 

    
    if(!message.member.voice.channel) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | Debes estar en un canal de voz!` }})

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | No estas en mi canal de voz!`}});
  
    
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | No hay nada reproduciendose!` }})
  
    client.player.shuffle(message.guild.id);

    message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.repeat} | Canciones barajeadas` }})
}
}

module.exports.help = {
name: 'shuffle',
description: 'Pon en random las canciones',
cooldown: [1],
alias: [],
usage: 'shuffle',
example: 'shuffle'
}