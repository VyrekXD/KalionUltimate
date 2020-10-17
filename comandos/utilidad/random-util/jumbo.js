const Discord = require('discord.js');

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
run: async (bot, message, args, send) => {

    if (!args[0]) return message.channel.send("Onta el emoji?")

    let emoji = message.guild.emojis.cache.find(x => x.name === args[0].split(":")[1])
    if(!emoji)return send('Eso no es un emoji **Recuerda que los emojis de discord no se pueden hacer grandes**')

    const attach = new Discord.MessageAttachment(emoji.url, {name: emoji.name})
    send(attach)

    }
}

module.exports.help = {
name: 'jumbo',
description: 'El emoji grande xd',
cooldown: [],
alias: [],
usage: 'jumbo [:emoji:]',
example: 'jumbo :pepeLaughs:'
}