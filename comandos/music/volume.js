const Discord = require('discord.js');

module.exports = {
aliases: ['vol'],
guildOnly: true,
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','CONNECT','SPEAK'],
run: async (client, message, args) => {

    
    if(!message.member.voice.channel) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | Debes estar en un canal de voz!` }})
    
  if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | No estas en mi canal de voz!`}});
  
  if(!client.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | No hay nada reproduciendose!` }})
  let volume = parseInt(args.join(" "));
  if (!volume) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | Porfavor ingresa un numero!` }})
  if (isNaN(args[0])) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | Porfavor ingresa un numero valido!` }})
  
  client.player.setVolume(message.guild.id, volume);
    
 return message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.success} | Volume set to \`${args.join(" ")}\` ` }});
    }
}

module.exports.help = {
name: 'volume',
description: 'Configura el volumen',
cooldown: [1],
alias: ['vol'],
usage: 'vol [cantidad]',
example: 'vol 100   '
}