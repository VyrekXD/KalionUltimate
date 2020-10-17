const Discord = require('discord.js');
const yiff = require("yiff")
const package = require('../../../package.json')
const nsfwModel = require('../../../database/models/nsfwConfig')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: ['furgfuck'],
run: async (bot, message, args, send) => {

    let find = await nsfwModel.findOne({guildID: message.guild.id})
    if(find){
        if(!find.noNSFW)return send('Comandos NSFW desactivados!')
        if(!find.furryStatus)return send('Comandos Furrys desactivados')
    }

    let user = message.mentions.members.first() || 
    message.guild.members.cache.get(args[0]);

    if(!user)return message.channel.send('A quien quieres hacerle cosas pillin >w<')
    if(user.id === bot.user.id)return message.channel.send('No, >:C')

    const info = {
        creator: package.author, 
        name: package.name,
        version: package.version
    }

    let e6 = new yiff.e621(info)
    let uwu = await e6.request('fuck','nsfw','gay','male','yaoi')

    const e = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`Se follo a ${user.user.username}`)
    .setImage(uwu.image)

    message.channel.send(e)

    }
}

module.exports.help = {
name: 'furfuck',
description: 'Folla a alguien furry gay',
cooldown: [],
alias: ['furgfuck'],
usage: 'furgayfuck [@usuario]',
example: 'furgayfuck @NoobLance'
}