const Discord = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
run: async (bot, message, args) => {

    let mensaje = await message.channel.send({embed: {color: 'RANDOM', description: `<a:loadingoogle:744334507242422302> Cargando todos los links y demas...`}})
    setTimeout(async () => {

        const e = new Discord.MessageEmbed()
        .setDescription(`[Hype Discord List](https://hypelist.glitch.me/bots/724749468418703432/)`)
        message.channel.send(e)
        

        mensaje.delete()
    }, 8 * 1000);
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