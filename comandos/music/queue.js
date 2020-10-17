const Discord = require('discord.js')
const fs = require("fs")
const { dateInt } = require('../../util/Functions/dateInt')

module.exports = {
aliases: ['q'],
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','CONNECT','SPEAK'],
run: async(client, message, args) => {


    
    if(!message.member.voice.channel) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | Debes de estar en un canal de voz!` }})
  
    let queue = client.player.getQueue(message.guild.id);

    if(!queue) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | No se esta reproduciendo nada!` }})

    let totduration = parseInt(queue.playing.duration);
    let a ;
    message.channel.send({embed: {color: client.colors.error,title: `**${message.guild.name} queue ${client.emotes.queue}**`,description: `**Reproduciendo:**\n - [${queue.playing.name}](${queue.playing.url}) | \`${queue.playing.duration} | Pedido por: ${queue.playing.requestedBy}\`\n\n**Despues:**`+
    (   
        queue.tracks.map((track, i) => {
            totduration+=parseInt(track.duration)
            a=1+i
            return `**#${i+1}** - [${track.name}](${track.url}) | \`${queue.playing.duration} | Pedido por: ${queue.playing.requestedBy}\``
        }).join('\n')
    )+`\n\n${a} Cancione(s) en Cola, ${dateInt(totduration)} Tiempo total`}});

    } 
}
module.exports.help = {
name: 'queue',
description: 'Muestra las canciones!',
cooldown: [1],
alias: ['q'],
usage: 'queue',
example: 'queue'
}