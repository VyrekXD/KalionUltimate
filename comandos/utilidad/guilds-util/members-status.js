const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
guildOnly: true,
aliases: ['mstatus'],
run: async (bot, message, args, send) => {

    const embed = new MessageEmbed() //abrimos el embed
    .setAuthor(message.author.username, message.author.avatarURL())
    .setTitle('Miembros del Servidor')
    .addField(
      "En línea:",
      `:green_circle: ${
        message.guild.members.cache.filter(o => o.presence.status === "online").size
      } En línea`
    )
    .addField(
        "Ausente:",
        `:yellow_circle: ${
          message.guild.members.cache.filter(o => o.presence.status === "idle").size
        } Ausente`
    )
    .addField(
      "No molestar:",
      `:no_entry: ${
        message.guild.members.cache.filter(o => o.presence.status === "dnd").size
      } No molestar`
    )
    .addField(
        "Desconectado:",
        `:white_circle: ${
          message.guild.members.cache.filter(o => o.presence.status === "offline").size
        } Desconectado`
    )
    .addField(
      "Bots:",
      `:space_invader: ${
       message.guild.members.cache.filter(m => m.user.bot).size
      } Bots`
    )
    .addField("Usuarios:",
    `:bust_in_silhouette: ${
      message.guild.memberCount - message.guild.members.cache.filter(m => m.user.bot).size
    } Usuarios`
    )
    .addField(
      "Total:",
      `:busts_in_silhouette: ${
        message.guild.members.cache.size
      } Total`
    )
    .setColor("RANDOM");
    message.channel.send(embed);
    }
}

module.exports.help = {
name: 'members-status',
description: 'Ve el status de los miembros',
cooldown: [],
alias: ['mstatus'],
usage: 'members-status',
example: 'members-status'
}