const Discord = require('discord.js');
const dig = require("discord-image-generation");

module.exports = {
    aliases: ['lpresentation'],
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {

        let txt = args.slice(0).join(" ")

        if(!txt)return message.channel.send(`Necesitas ingresar texto!`)
        if(txt.length >= 300)return message.channel.send(`El limite de texto es 300`)

        let text = await new dig.LisaPresentation().getImage(txt)
    
        let attach = new Discord.MessageAttachment(text, "texto.png")
    
        message.channel.send(attach)
    }
}
module.exports.help = {
name: 'lisapresentation',
description: 'Pon texto en la presentacion de lisa',
cooldown: [],
alias: ['lpresentation'],
usage: 'lpresentation [texto]',
example: 'lpresentation Kalion Ultimate el mejor bot!'
}