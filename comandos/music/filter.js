const Discord = require('discord.js');
const filters = require("../../util-config").filters;

module.exports = {
aliases: [],
guildOnly: true,
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','CONNECT','SPEAK'],
run: async (client, message, args) => {
    return message.channel.send(`Comandos en construccion...`)

    
    if(!message.member.voice.channel) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | Debes estar en un canal de voz!` }})

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | No estas en mi canal de voz!`}});
  
    
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | No hay nada reproduciendose!` }})

    const filter = args[0];
    if(!filter) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | Necesitas escribir un filtro!` }});

    const filterToUpdate = Object.values(filters).find((f) => f.toLowerCase() === filter.toLowerCase());

    if(!filterToUpdate) return message.channel.send(`This filter doesn't exist ${emotes.error}`);

    const filterRealName = Object.keys(filters).find((f) => filters[f] === filterToUpdate);

    const queueFilters = client.player.getQueue(message.guild.id).filters
    const filtersUpdated = {};
    filtersUpdated[filterRealName] = queueFilters[filterRealName] ? false : true;
    client.player.setFilters(message.guild.id, filtersUpdated);

    if(filtersUpdated[filterRealName]) {

        //The bot adds the filter on the music
        message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.repeat} | Estoy añadiendo el filtro, Nota: El filtro se agregara terminando la cancion` }})

    } else {

        //The bot removes the filter from the music
        message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.repeat} | Estoy removiendo el filtro, Nota: El filtro se removera terminando la cancion` }})

    }
}
}

module.exports.help = {
name: 'filter',
description: 'Filtros de la cancion',
cooldown: [1],
alias: [],
usage: 'filter [filtro]',
example: 'filter Vibrato'
}