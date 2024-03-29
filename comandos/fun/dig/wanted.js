const Discord = require('discord.js');
const dig = require("discord-image-generation");

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {

    let user = message.mentions.users.first() || message.author
    let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })

    const a = ['$' ,'€' ,'¥']
    message.channel.send(`<a:cargando:738889792007176253> La imagen usa dieferentes simbolos de moneda como:\n ${a}`).then(async m => {
        setTimeout(async() => {
        
    let c = a[Math.floor(a.length * Math.random())]

    let img = await new dig.Wanted().getImage(avatar, c)

    let attach = new Discord.MessageAttachment(img, "wanted.png")

        m.delete()
            message.channel.send(attach)
        }, 3000)
         })
    

    
    }
}

module.exports.help = {
name: 'wanted',
description: 'Muestra a un usuario wanted',
cooldown: [],
alias: [],
usage: 'wanted (@user)',
example: 'wanted'
}