const Discord = require('discord.js');
const dig = require("discord-image-generation");

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {

    let user = message.mentions.users.first() || message.author
    let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })

    let img = await new dig.Beautiful().getImage(avatar)

    let attach = new Discord.MessageAttachment(img, "beatiful.png")

    message.channel.send(attach)
    }

}

module.exports.help = {
name: 'beautiful',
description: 'El comando beautiful en canvas',
cooldown: [],
alias: [],
usage: 'beautiful [@user]',
example: 'beautiful @kalion'
}