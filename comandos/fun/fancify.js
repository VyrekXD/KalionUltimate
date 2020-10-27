const Discord = require('discord.js');

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    run: async(client, message, args) => {
    let texto = args.join(" ")

    if(!texto)return message.channel.send('Necesitas poner texto a convertir')

    message.delete()

    const chatUtil = require('../../util/Functions/convertFancy')
   let res = await chatUtil.convertFancy(texto)
   message.channel.send(res)
}
}

module.exports.help = {
name: 'fancify',
description: '𝐻𝒶𝓈 𝓉𝑒𝓍𝓉𝑜 𝒻𝒶𝒸𝒽𝒶',
cooldown: [],
alias: [],
usage: 'fancify [texto]',
example: 'fancify eri gay?'
}