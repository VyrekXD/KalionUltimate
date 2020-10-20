const Discord = require('discord.js');

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
guildOnly: true,
aliases: [],
run: async (bot, message, args, send) => {

    const discriminator = args[0] ? args[0] : message.author.discriminator;
    if(isNaN(discriminator))return send("Eso no es un numero")

    if(discriminator.length > 4 || discriminator.length < 4)return send("Las tags solo tienen 4 numeros")
    const filtro = bot.users.cache.filter(user => user.discriminator === discriminator && user.tag !== message.author.tag)

    if(filtro.size == 0)return send("No encontre a nadie")

    const mapeo = filtro.map(usuario => usuario.tag)

    const e = new Discord.MessageEmbed()
    .setDescription(mapeo.join("\n"))
    .setColor("RANDOM")
    .setFooter("He encontrado a "+filtro.size+" usuarios.", bot.user.avatarURL)
    .setAuthor(message.author.tag, message.author.avatarURL)
    send(e)

    }
}

module.exports.help = {
name: 'tag',
description: 'Busca usuarios con el mismo tag que pongas',
cooldown: [],
alias: [],
usage: 'tag [numero]',
example: 'tag 4003'
}