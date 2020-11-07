const Discord = require('discord.js');
const dig = require("discord-image-generation");

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => { 

    let user = message.mentions.users.first()
    let autor = message.author

    if(!user)return message.channel.send(`Necesitas mencionar a alguien!`)

    let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })
    let avatar2 = autor.displayAvatarURL({ dynamic: false, format: 'png' })

    let img = await new dig.Batslap().getImage(avatar2, avatar)

    let attach = new Discord.MessageAttachment(img, "batslap.png")

    message.channel.send(attach)
}}

module.exports.help = {
name: 'batslap',
description: 'Dale una cachetada a alguien como batman',
cooldown: [],
alias: [],
usage: 'batslap [@user]',
example: 'batslap @kalion'
}