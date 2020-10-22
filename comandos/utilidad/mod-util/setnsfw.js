const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
 
module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','MANAGE_CHANNELS'],
aliases: [],
guildOnly: true,
run: async (bot, message, args, send) => {

    if(!message.member.hasPermission('MANAGE_CHANNELS'))return send('No tienes permisos :(')

    let channel = message.mentions.channels.first()
    let elc

    if(!channel){
        if(message.guild.channels.resolve(args[0])){
            channel = message.guild.channels.resolve(args[0])
            elc = args[1]
        } else {
            channel = message.channel
            elc = args[0]
        } 
    } else {
        channel = message.channel
        elc = args[0]
    }

    if(!channel)return send('No mencionaste ningun canal')
    if(!elc)return send('No seleccionaste ninguna opcion: [on/off]')

    let op = {
        "off":false,
        "on":true
    }
    let op1 = ['on','off']

    if(!op1.includes(elc.toLowerCase()))return send('No seleccionaste una opcion correcta: [on/off]')

    if(channel.nsfw === op[elc])return send(`Ese canal ya tiene ese estado NSFW!`)

    await channel.setNSFW(op[elc.toLowerCase()], `${message.author.tag} ha cambiado el estado NSFW de el canal ${channel.name} correctamente`).catch(err => {
        send(`Hubo un error! Aqui esta el:\n\`\`\`js\n${err}\`\`\``)
    })

    let e = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(`${bot.emotes.success} El estado NSFW de el canal ${channel.toString()} ha sido cambiado correctamente a ${elc}`)
    .setColor('GREEN')

    send(e)
   }
}

module.exports.help = {
name: 'setnsfw',
description: 'Cambia el estado nsfw de un canal',
cooldown: [],
alias: [],
usage: 'setnsfw [channel/on/off]',
example: 'setnsfw #general off'
}