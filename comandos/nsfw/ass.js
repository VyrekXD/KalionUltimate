const Discord = require('discord.js');
const DabiImages = require("dabi-images")
const DabiClient = new DabiImages.Client()
const nsfwModel = require('../../database/models/nsfwConfig')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
nsfw: true,
run: async (bot, message, args, send) => {

    let find = await nsfwModel.findOne({guildID: message.guild.id})
    if(find){
        if(!find.noNSFW)return send('Comandos NSFW desactivados!')
    }

    let url = await DabiClient.nsfw.real.ass()

    const e = new Discord.MessageEmbed()
    .setImage(url.url)
    .setDescription(`Ping: ${url.time}`)
    .setColor('RANDOM')

    message.channel.send(e)
    }
}

module.exports.help = {
name: 'ass',
description: 'Muestra un culito 7w7',
cooldown: [],
alias: [],
usage: 'ass',
example: 'ass'
}