const Discord = require('discord.js');
const client = new Discord.Client();
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