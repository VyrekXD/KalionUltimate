const Discord = require('discord.js');

module.exports = {
aliases: [],
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','CONNECT','SPEAK'],
run: async (client, message, args) => {
 
    const voiceChannel = message.member.voice.channel;
    
    if(!voiceChannel)return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | Necesitas estar en un canal de voz!`}});
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | No estas en mi canal de voz!`}});

    if(!client.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | No hay nada reproduciendose!` }})

    let song = await client.player.pause(message.guild.id);
            
    return message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.pause} | Pausado!` }});
    }
}

module.exports.help = {
name: 'pause',
description: 'Detiene la cancion',
cooldown: [1],
alias: [],
usage: 'pause',
example: 'pause'
}