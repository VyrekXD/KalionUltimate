const Discord = require('discord.js');

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
run: async (bot, message, args, send) => {

    let usuario = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author

    let filtro = client.guilds.cache.filter(g => g.members.cache.has(usuario.id))
  
    let servers = filtro.map(g => '`'+g.name+'`').join(', ')
  
    let tamaño = filtro.size
  
    if (filtro <= 1) return message.channel.send('`❌>` No se han encontrado resultados.')
  
    const e = new Discord.MessageEmbed()
    .setTitle('Servidores en común con '+usuario.tag)
    .setDescription(servers)
    .setColor("RANDOM")
    send(e)
    }
}

module.exports.help = {
name: 'seeon',
description: 'Ve en que servidores esta cierto usuario',
cooldown: [],
alias: [],
usage: 'seeon [usuario]',
example: 'seeon @NoobLance'
}