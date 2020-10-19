const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: ['ulinks'],
guildOnly: true,
run: async (bot, message, args, send) => {

    let user = message.mentions.users.first() || bot.users.resolve(args[0])

    if(!user)return send('Menciona o pan la ID de un usuario!')

    const res = await fetch(`https://dsc.gg/api/links/${user.id}`, {method: 'GET'})

    if(pet.status === 404)return send('No se encontro ese Usuario!')
    if(res.status !== 200)return send('Hubo un error! Codigo:'+res.status)

    const infoT = await res.json()

    const e = new MessageEmbed()
    .setAuthor(user.tag, user.displayAvatarURL())
    .setColor('RANDOM')
    .setFooter('Thanks! https://dsc.gg')

    let i = 1;
    for(let info of infoT){
        e.addField(`**Link ${i}**`, `
        - Clicks: ${info.clicks}
        - Owner: <@${info.owner}>
        - Redirect: ${info.redirect}
        - Recent: ${info.recent_time}`)
        i++
    }

    send(e, {maxLength: 2040})
    }
}

module.exports.help = {
name: 'user-links',
description: 'Ve los links de un usuario, inviatcion de dsc.gg',
cooldown: [],
alias: ['ulinks'],
usage: 'ulinks [usuario]',
example: 'ulinks @VYREK'
}