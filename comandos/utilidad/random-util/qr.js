const Discord = require('discord.js');

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
run: async (bot, message, args, send) => {

    let text = args.join(" ");
    if(!text)return message.channel.send("Debes especificar un texto para generar.");
    
    let e = new Discord.MessageEmbed()
    .setImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text.replace(new RegExp(" ", "g"), "%20")}`)
    .setColor('GREEN');

    send(e)
    }
}

module.exports.help = {
name: 'qr',
description: 'Crea un qr con el texto que quieras uwu',
cooldown: [],
alias: [],
usage: 'qr [texto]',
example: 'qr eri gay?'
}