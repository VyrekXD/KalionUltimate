const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const devModel = require('../../database/models/developers')
const fetch = require('node-fetch')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
run: async (bot, message, args, send) => {

    let consulta = await devModel.findOne({userID: message.author.id})

    if(!consulta)return message.channel.send(`Solo **Developers** pueden usar este comando!`)

    let user = message.mentions.users.first() || bot.users.resolve(args[0])

    if(!user)return send('Menciona a alguien!')

    const res = await fetch(`https://api.discordlabs.org/v1/bot/${bot.user.id}/${user.id}/check`)

    const json = await res.json()

    if(json.voted === 0){
        const e = new MessageEmbed()
        .setColor('RED')
        .setDescription(`El usuario no ha votado por el bot!`)
    
        return send(e)
    }

    const e = new MessageEmbed()
    .setColor('GREEN')
    .addField('**Votos**', json.voted)

    send(e)

    }
}
module.exports.help = {
    name: 'checkvote',
    aliases: [],
}