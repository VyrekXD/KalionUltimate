const Discord = require('discord.js');
const dig = require("discord-image-generation");

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {

    let user = message.mentions.users.first() || message.author
    let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })

    let img = await new dig.Delete().getImage(avatar)

    let attach = new Discord.MessageAttachment(img, "delete.png")

    message.channel.send(attach)
}
}

module.exports.help = {
name: 'eliminar',
description: 'Elimina a un usuario',
cooldown: [],
alias: [],
usage: 'eliminar (@user)',
example: 'eliminar @kalion'
}