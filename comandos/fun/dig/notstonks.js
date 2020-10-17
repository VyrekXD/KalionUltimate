const Discord = require('discord.js');
const client = new Discord.Client();
const dig = require("discord-image-generation");

module.exports = {
    aliases: ['nstonks'],
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    run: async(client, message, args) => {

    let user = message.mentions.users.first() || message.author
    let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })

    let img = await new dig.NotStonk().getImage(avatar)

    let attach = new Discord.MessageAttachment(img, "notstonks.png")

    message.channel.send(attach)
}
}
