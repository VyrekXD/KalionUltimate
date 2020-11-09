const Discord = require('discord.js');

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    run: async(client, message, args) => {
    let texto = args.join(" ")

    if(!texto)return message.channel.send('Necesitas poner texto a convertir')

    message.delete()

    const chatUtil = require('../../util/Functions/convertEmoji')
   let res = await chatUtil.convertEmoji(texto)
   message.channel.send(res)
}
}
module.exports.help = {
name: 'emojify',
description: 'Convierte texto a emoji',
cooldown: [],
alias: [],
usage: 'emojify [texto]',
example: 'emojify eri gay?'
}