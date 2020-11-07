const Discord = require('discord.js');
const dig = require("discord-image-generation");

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {

    let user = message.mentions.users.first() || message.author
    let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })

    let img = await new dig.Circle().getImage(avatar)

    let attach = new Discord.MessageAttachment(img, "Circle.png")

    message.channel.send(attach)
}
}

module.exports.help = {
name: 'circle',
description: 'Muestra tu avatar como circulo',
cooldown: [],
alias: [],
usage: 'circle (@user)',
example: 'circle @kalion'
}