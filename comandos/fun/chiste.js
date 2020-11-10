const Discord = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','MANAGE_EMOJIS'],
aliases: ['broma','joke'],
run: async (bot, message, args) => {

    const fet = await fetch('https://sv443.net/jokeapi/v2/joke/Any?lang=es&type=single', {method: 'GET'});
    const json = await fet.json()

    if(json.error)return send(`Ocurrio un error!\n\`\`\`\n${json.error}\`\`\``)

    const e = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`Chiste`)
    .addField(`**Categoria**`, json.category)
    .setDescription(json.joke)

    send(e)
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