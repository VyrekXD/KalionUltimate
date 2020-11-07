const Discord = require('discord.js');
const dig = require("discord-image-generation");

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {

    let user = message.mentions.users.first() || message.author
    let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })

    let img = await new dig.Gay().getImage(avatar)

    let attach = new Discord.MessageAttachment(img, "gay.png")

    message.channel.send(attach)
}
}

module.exports.help = {
name: 'gay',
description: 'Puedes hacer que el avatar de una persona tenga la bandera gay',
cooldown: [],
alias: [],
usage: 'gay (@user)',
example: 'gay @kalion'
}