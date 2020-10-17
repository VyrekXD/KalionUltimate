const Discord = require('discord.js');
const dig = require("discord-image-generation");

module.exports = {
    aliases: ['byn'],
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    run: async(client, message, args) => {

        let user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })
    
        let img = await new dig.Greyscale().getImage(avatar)
    
        let attach = new Discord.MessageAttachment(img, "blancoynegro.png")
    
        message.channel.send(attach)
    }
}