const Discord = require('discord.js');
const Client = require('fortnite');
const fortnite = new Client('e59b759c-0117-430f-aa6f-74352c85810f');

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: ['fuser'],
run: async (bot, message, args) => {

    let argsPlatform = args[0]
    let nickFortnite = args[1]

    let platforms = ['pc', 'xbl', 'psn']

    if(!argsPlatform)return message.channel.send(`Debes incluir una plataforma! [pc, xbl, psn]`)
    if(!platforms.includes(argsPlatform))return message.channel.send(`Plataforma invalida! [pc, xbl, psn]`)
    if(!nickFortnite)return message.channel.send(`Incluye el nickname!`)

    let fortniteUser = await fortnite.user(nickFortnite, argsPlatform)
    let game = await fortniteUser.stats.recent[0]

    const et = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`<a:loadingoogle:744334507242422302> Cargando datos de fortnite...`)

    let mensaje = await message.channel.send(et)

    const e = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setURL(fortniteUser.url)
    .setTitle(fortniteUser.username)
    .setDescription(`ID de cuenta: ${fortniteUser.id}`)
    .addField(`**Detalles de cuenta**`, `**Detalles Globales**
    Top 3: ${fortniteUser.stats.lifetime.top_3}
    Top 5: ${fortniteUser.stats.lifetime.top_5}
    Top 12: ${fortniteUser.stats.lifetime.top_12}
    Partidas Jugadas: ${fortniteUser.stats.lifetime.matches}
    Partidas Ganadas: ${fortniteUser.stats.lifetime.wins}
    Kills: ${fortniteUser.stats.lifetime.kills}
    Kill/Death: ${fortniteUser.stats.lifetime.kd}`)
    .addField(`**Ultima Partida**`, `**Estadisticas de la ultima Partida**
    Fecha: ${game.date}
    Modo: ${game.mode}
    Score: ${game.score}
    Kills: ${game.kills}`)

    setTimeout(() => {
    
        mensaje.edit(e)
    }, 5 * 1000);

}
}

module.exports.help = {
name: 'fortniteuser',
description: 'Ve la informacion de un usuario de fortnite',
cooldown: [],
alias: [],
usage: 'fortniteuser [Plataforma (kbm, gamepad, touch)] [Nickname de epic]',
example: 'fortniteuser gamepad Vyrek._.XD'
}