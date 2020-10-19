const Discord = require('discord.js');
const ms = require('ms')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','MANAGE_CHANNELS'],
aliases: [],
guildOnly: true,
run: async (bot, message, args, send) => {

    if(!message.member.hasPermissions(["ADMINISTRATOR", "MANAGE_CHANNELS"]))return send('No tienes permisos')

    let canal = message.mentions.channels.first(), tiempo = args.slice(1).join(" ")

    if(!canal)tiempo = args.join(" "), canal = message.channel

    if(args[0].toLowerCase()  === "off") {
        await canal.setRateLimitPerUser(0)
        return message.channel.send(`Se ha desactivado el cooldown para el canal: <#${canal.id}>`)
    }

    if (!tiempo) return message.channel.send("Incluye el formato de hora.");
  
    let conversion = ms(tiempo)
    let segundos = Math.floor(conversion / 1000)
    
    if (segundos > 21600) return message.channel.send("El temporizador debe ser menor o igual a 6 horas.")
    else if (segundos < 1) return message.channel.send("El temporizador debe ser mayor o igual a 1 segundo.")

    await canal.setRateLimitPerUser(segundos)
    return send(`Este canal: <#${canal.id}> se le colocó un cooldown de **${ms(ms(tiempo), {long: true})}**.`)
    }
}

module.exports.help = {
name: 'cooldown',
description: 'Poner un cooldown en un canal',
cooldown: [],
alias: [],
usage: '',
example: ''
}