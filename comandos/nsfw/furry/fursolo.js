const Discord = require('discord.js');
const yiff = require("yiff")
const package = require('../../../package.json')
const nsfwModel = require('../../../database/models/nsfwConfig')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
nsfw: true,
guildOnly: true,
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

    let gen = args[0]
    if(!gen) gen = 'male'

    let array = ['male','female','femboy']
    if(!array.includes(gen))return message.channel.send(`Necesitas poner un tag valido: ${array}`)

    if(gen === 'male'){

        let e6 = new yiff.e621(info)
        let uwu = await e6.request('boy','solo','male','nsfw','malesolo')
    
        const e = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setImage(uwu.image)
    
        message.channel.send(e)
    }else if(gen === 'female'){

        let e6 = new yiff.e621(info)
        let uwu = await e6.request('girl','solo','female','nsfw','femalesolo')
    
        const e = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setImage(uwu.image)
    
        message.channel.send(e)
    }else if(gen === 'femboy'){

        let e6 = new yiff.e621(info)
        let uwu = await e6.request('solo','femboy','nsfw','femboysolo')
    
        const e = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setImage(uwu.image)
    
        message.channel.send(e)
    }

    }
}

module.exports.help = {
name: 'fursolo',
description: 'Fotos yiff solos',
cooldown: [],
alias: [],
usage: 'fursolo (male/female/femboy)',
example: 'fursolo male'
}