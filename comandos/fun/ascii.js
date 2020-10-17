const figlet = require('figlet');
const Discord = require('discord.js');

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    run: async(client, message, args) => {
     
    if (!args[0]) return message.reply("¿Y el Texto?")
    if (args.join(" ") > 15) message.reply("El texto no puede contener más de 15 Caracteres")
    figlet(args.join(" "), (err, data) => message.channel.send("```" + data + "```"))
}}

module.exports.help = {
name: 'ascii',
description: 'Convierte en ascii texto',
cooldown: [],
alias: [],
usage: 'ascii [Texto]',
example: 'ascii eri gay?'
}