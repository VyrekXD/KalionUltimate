const Discord = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','MANAGE_EMOJIS'],
aliases: ['broma','joke'],
run: async (bot, message, args) => {

    const fetching1 = await fetch('https://risapi.glitch.me/', {method: 'GET'});
    const json1 = await fetching1.json()

    const fetching2 = await fetch('https://risapi.glitch.me/', {method: 'GET'});
    const json2 = await fetching2.json()

    const fetching3 = await fetch('https://risapi.glitch.me/', {method: 'GET'});
    const json3 = await fetching3.json()

    const fetching4 = await fetch('https://risapi.glitch.me/', {method: 'GET'});
    const json4 = await fetching4.json()

    const fetching5 = await fetch('https://risapi.glitch.me/', {method: 'GET'});
    const json5 = await fetching5.json()

    let totalChistes = [json1.chiste, json2.chiste, json3.chiste, json4.chiste, json5.chiste]
    let pocision = 0;

    const e1 = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`<a:loadingoogle:744334507242422302> Cargando los chistacos xD`)

    let msg = await message.channel.send(e1)

    const e = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`Chistacos`)
    .setDescription(totalChistes[pocision])

    setTimeout(() => {
        
        msg.edit(e)
    }, 1000 * 5);

    let totalPaginas = [];
    let paginaActual = 0;

    for (let chiste of totalChistes){

        const e2 = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(chiste)

        totalPaginas.push(e2)
    }
    await msg.react('◀️')
    await msg.react('⏹️')
    await msg.react('▶️')

    const filter = (reaction, user) => {return ['◀️','⏹️','▶️'].includes(reaction.emoji.name) && user.id === message.author.id}
    const collector = msg.createReactionCollector(filter, { time: 60000})

    collector.on('collect', async reaction => {

        if(reaction.emoji.name === '◀️'){

            msg.reactions.cache.find(r => r.emoji.name == '◀️').users.remove(message.author.id).catch(() => {})

            if(paginaActual < totalPaginas.length - 1){
                msg.edit(totalPaginas[++paginaActual])
            }
        } else if(reaction.emoji.name === '⏹️'){

            msg.reactions.cache.find(r => r.emoji.name == '⏹️').users.remove(message.author.id).catch(() => {})
            collector.stop()

        } else if(reaction.emoji.name === '▶️'){

            msg.reactions.cache.find(r => r.emoji.name == '▶️').users.remove(message.author.id).catch(() => {})
            if(paginaActual !== 0){
                msg.edit(totalPaginas[--paginaActual])
            }
        }
    })

    collector.on('end', () => {return msg.reactions.removeAll()});
    }
}

module.exports.help = {
name: 'chiste',
description: 'Te da un chiste random xD',
cooldown: [],
alias: ['broma','joke'],
usage: 'chiste',
example: 'chiste'
}