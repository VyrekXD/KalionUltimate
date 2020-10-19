const Discord = require('discord.js');
const { checkPerms } = require('../../../util/Functions/checkPermissions')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','MANAGE_ROLES'],
aliases: [],
guildOnly: true,
run: async (bot, message, args, send) => {

    if(!checkPerms(message.member, 'MANAGE_ROLES'))return send('No tienes permisos para crear un rol')
    if(!args[0])return send('Necesitas decir el nombre de el rol')

    let newRole = await message.guild.roles.create({data: {
        name: args.join(' '),
        color: `#${Math.random().toString(16).slice(-6)}`
    }})

    let e = new Discord.MessageEmbed()
    .setTitle('**Rol Creado**')
    .setDescription(newRole)
    .setColor('RANDOM')
    

    send(e)

    }
}

module.exports.help = {
name: 'createrole',
description: 'Crea un rol random con el nombre que le des',
cooldown: [],
alias: ['crole'],
usage: 'crole [Nombre]',
example: 'crole uwu'
}