const Discord = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: ['discordrep'],
guildOnly: true,
run: async (bot, message, args) => {

    let user = message.mentions.users.first() ||
    bot.users.resolve(args[0])

    if(!user)return message.channel.send(`Menciona un usuario`)

    let petition = await fetch(`https://discordrep.com/api/v3/rep/${user.id}`, {method: 'GET', headers: {Authorization: 'D-REP.SA6V2.5CPVQZ4S7K5TW06J7V5A8X.BY65T2T.C5C022V.YGKCAJ9IJ4PZW'} })
    let json = await petition.json()
    const e = new Discord.MessageEmbed()
    .setThumbnail(user.displayAvatarURL())
    .setTitle(`${user.username}, Reputation`)
    .setColor('RANDOM')
    .addField(`UpVotes`, json.upvotes, true)
    .addField(`DownVotes`, json.downvotes, true)
    .addField(`Rank`, json.rank, true)
    .addField(`XP`, json.xp, true)
    json.staff ? e.setDescription(`${user.tag}, es parte de el staff de Discord Reputation`) : ''

    message.channel.send(e)
    }
}

module.exports.help = {
name: 'discordreputation',
description: 'Ve la reputacion de un usuario via: ',
cooldown: [],
alias: ['discordrep'],
usage: 'discordrep [usuario]',
example: 'discordrep @NoobLance'
}