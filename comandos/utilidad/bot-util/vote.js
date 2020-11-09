const Discord = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
guildOnly: true,
run: async (bot, message, args) => {

        const e = new Discord.MessageEmbed()
        .setTitle('Links')
        .setAuthor(bot.user.tag, bot.user.displayAvatarURL())
        .setColor('RANDOM')
        .setDescription(`Hype Discord List [:radio_button:](https://hypelist.glitch.me/bots/724749468418703432/)
        Statcord [:radio_button:](https://statcord.com/bot/724749468418703432)
        MyBOTList [:radio_button:](https://www.portalmybot.com/mybotlist/bot/724749468418703432)
        DiscordBotList [:radio_button:](https://discordbotlist.com/bots/kalion-ultimate)`)


    }
}

module.exports.help = {
name: 'vote',
description: 'Vota por el bot!',
cooldown: [],
alias: [],
usage: 'vote',
example: 'vote'
}