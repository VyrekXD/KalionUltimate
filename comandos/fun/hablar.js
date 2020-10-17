const Discord = require('discord.js');
const chatbot = require("espchatbotapi")

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
run: async (bot, message, args) => {
 
    chatbot.hablar(args.join(' ')).then(respuesta => {
        message.channel.send(respuesta)
      })
    }
}

module.exports.help = {
name: 'hablar',
description: 'Habla con el bot xd',
cooldown: [],
alias: [],
usage: 'hablar [texto]',
example: 'hablar eri gay?'
}