const Discord = require('discord.js');
const dig = require("discord-image-generation");

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {

    let user = message.mentions.users.first() || message.author
    let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })

    let img = await new dig.Bobross().getImage(avatar)

    let attach = new Discord.MessageAttachment(img, "bobross.png")

    message.channel.send(attach)
}
}

module.exports.help = {
name: 'bobross',
description: 'Muestra tu avatar pintado por bobross',
cooldown: [],
alias: [],
usage: 'bobross (@user)',
example: 'bobross'
}