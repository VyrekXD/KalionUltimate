const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
run: async (bot, message, args, send) => {

    const e = new MessageEmbed()
    .setColor(`#f2a4a9`)
    .setTitle(`Kirby!`)
    .setDescription(`Kirby! es el primer bot concentrado en starboard en español,
     lo puedes invitar dando [click aqui](https://discord.com/api/oauth2/authorize?client_id=770308348766584883&permissions=8&scope=bot) y puedes ver su documentacion [aqui](https://vyrekxd.gitbook.io/kirby/)`)
   
}
}

module.exports.help = {
name: 'kirby',
description: 'Te explica quien es kirby',
cooldown: [],
alias: [],
usage: 'kirby',
example: 'kirby'
}