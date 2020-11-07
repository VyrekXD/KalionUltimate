const Discord = require('discord.js');
const dig = require("discord-image-generation");

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {

    let user = message.mentions.users.first() || message.author
    let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })

    let img = await new dig.Rip().getImage(avatar)

    let attach = new Discord.MessageAttachment(img, "rip.png")

    message.channel.send(attach)
    }
}

module.exports.help = {
name: 'rip',
description: 'Muestra la tumba de un user',
cooldown: [],
alias: [],
usage: 'rip (@user)',
example: 'rip'
}