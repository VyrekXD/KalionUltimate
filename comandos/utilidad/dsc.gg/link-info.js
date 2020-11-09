const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')
const prefixModel = require('../../../database/models/guildPrefix')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: ['linfo'],
guildOnly: true,
run: async (bot, message, args, send) => {

    let res = await prefixModel.findOne({servidor: message.guild.id}).exec()
    let prefix = res ? res.prefix : 'k-'

    if(!args[0])return send(`Debes poner una id de invitacion! Ejemplo: ${prefix}linfo vyrekcm`)

    const ID = encodeURI(args[0])
    const pet = await fetch(`https://dsc.gg/api/link/`+ID, {method: 'GET'}).catch(err => {
        return send('Hubo un error!```\n'+err+'```')
    })

    if(pet.status === 404)return send('No se encontro esa ID!')
    if(pet.status !== 200)return send('Hubo un error! Error:'+res.status)

    const info = await pet.json()

    const e = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .addField('**Clicks**', info.clicks, true)
    .addField(`**Invitacion**`, info.redirect, true)
    .addField(`**Owner**`, `<@${info.owner}>`, true)
    .addField(`**Ultima Vista**`, `
    - Tipo: ${info.type}
    - Dispositivo: ${info.recent}
    - Fecha: ${info.recent_time}`)
    .setColor('BLUE')
    .setFooter('Thanks! https://dsc.gg')

    send(e)

    }
}

module.exports.help = {
name: 'link-info',
description: 'Obtiene informacion de un link de dsc.gg',
cooldown: [],
alias: ['linfo'],
usage: 'linfo [id]',
example: 'linfo vyrekcm'
}