const Discord = require('discord.js');
const dig = require("discord-image-generation");

module.exports = {
    aliases: ['dstonks'],
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {

    let user = message.mentions.users.first()
    let autor = message.author

    if(!user)return message.channel.send(`Necesitas mencionar a alguien!`)

    let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })
    let avatar2 = autor.displayAvatarURL({ dynamic: false, format: 'png' })

    let img = await new dig.DoubleStonk().getImage(avatar, avatar2)

    let attach = new Discord.MessageAttachment(img, "doublestonks.png")

    message.channel.send(attach)
}
}

module.exports.help = {
name: 'doublestonks',
description: 'Stonks con tu compañero, double stonks!',
cooldown: [],
alias: ['dstonks'],
usage: 'dstonks [@user]',
example: 'dstonks @kalion'
}