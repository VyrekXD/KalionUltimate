const Discord = require('discord.js');
const yiff = require("yiff")
const package = require('../../../package.json')
const nsfwModel = require('../../../database/models/nsfwConfig')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
nsfw: true,
run: async (bot, message, args, send) => {

    let find = await nsfwModel.findOne({guildID: message.guild.id})
    if(find){
        if(!find.noNSFW)return send('Comandos NSFW desactivados!')
        if(!find.furryStatus)return send('Comandos Furrys desactivados')
    }

    const info = {
        creator: package.author, 
        name: package.name,
        version: package.version
    }

    let e6 = new yiff.e621(info)
    let uwu = await e6.request('gay','nsfw')

    const e = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setImage(uwu.image)

    message.channel.send(e)

    }
}

module.exports.help = {
name: 'furgay',
description: 'Muestra furries gays',
cooldown: [],
alias: [],
usage: 'furgay',
example: 'furgay'
}