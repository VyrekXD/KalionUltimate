const Discord = require('discord.js');
const moneyModel = require('../../../database/models/dinero')

module.exports = {
aliases: ['top'],
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
guildOnly: true,
run: async (client, message, args) => {
 
    const consulta = await moneyModel.find({servidor: message.guild.id}).sort({dinerotot: -1 })
    const top = consulta.slice(0, 5)

    if(consulta.length === 0)return message.channel.send({embed: {description: client.emotes.error + ` No hay usuarios registrados`}})
    const e = new Discord.MessageEmbed()
    .setColor(client.colors.succes)
    .setTitle(`${message.guild.name} top`)
    .setDescription(
        top.map((a, b) => {
            switch (b) {
                case 0: return `<:medal1:753263975768129629> **#${(b + 1)}** ${client.users.resolve(a.usuario).username} :dollar:${a.dinerotot}`
                case 1: return `<:medal2:753264319923224596> **#${(b + 1)}** ${client.users.resolve(a.usuario).username} :dollar:${a.dinerotot}`
                case 2: return `<:medal3:753267312471179357> **#${(b + 1)}** ${client.users.resolve(a.usuario).username} :dollar:${a.dinerotot}`
                default: return `**#${(b + 1)}** ${client.users.resolve(a.usuario).username} :dollar:${a.dinerotot}`
          }
        }
            )
    )


    message.channel.send(e)
    }
}

module.exports.help = {
name: 'leaderboard',
description: 'Muestra la gente con mas dinero',
cooldown: [],
alias: ['top'],
usage: 'top',
example: 'top'
}