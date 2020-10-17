const Discord = require('discord.js');

module.exports = {
aliases: ['dice'],
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
run: async (client, message, args) => {
    const dado =
    ['https://imgur.com/iP9OttU',
    'https://imgur.com/7xnxPyR',
    'https://imgur.com/86p9qal',
    'https://imgur.com/aV2PYwP',
    'https://imgur.com/lSMrybN',
    'https://imgur.com/eE9xwPm'];
    
    const embed = new Discord.MessageEmbed()
        
    .setAuthor(message.author.username+" <:dices:749789521880678474> Tu numero es:")
    .setImage(dado[Math.floor(dado.length * Math.random())])
    .setColor("RANDOM")
    
    message.channel.send(embed)
    }
}

module.exports.help = {
name: 'dado',
description: 'Tira un dado',
cooldown: '',
alias: ['dice'],
usage: 'dice',
example: 'dice'
}