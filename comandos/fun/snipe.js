const Discord = require('discord.js');
const snipeModel = require('../../database/models/snipes')

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {

    let consulta = await snipeModel.findOne({servidor: message.guild.id})
    if(!consulta)return message.channel.send(`No hay mensaje eliminado!`)

    let weon = await message.guild.members.cache.get(consulta.usuario)

    const e = new Discord.MessageEmbed()
    .setColor(`RANDOM`)
    .setAuthor(weon.user.tag, weon.user.displayAvatarURL())
    .setDescription(consulta.mensaje)
    .setTimestamp(Number(consulta.hora))

    message.channel.send(e)
}}

module.exports.help = {
name: 'snipe',
description: 'Ve mensajes borrados :flushed:',
cooldown: [],
alias: [],
usage: 'snipe',
example: 'snipe'
}