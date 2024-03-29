const Discord = require('discord.js');
const dig = require("discord-image-generation");

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {

    let user = message.mentions.users.first() || message.author
    let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })

    let img = await new dig.Thomas().getImage(avatar)

    let attach = new Discord.MessageAttachment(img, "putin.png")

    message.channel.send(attach)
    }
}

module.exports.help = {
name: 'thomas',
description: 'Mestra el tren thomas',
cooldown: [],
alias: [],
usage: 'thomas (@user)',
example: 'thomas'
}