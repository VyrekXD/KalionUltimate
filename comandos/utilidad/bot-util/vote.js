const Discord = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
guildOnly: true,
run: async (bot, message, args) => {

    let mensaje = await message.channel.send({embed: {color: 'RANDOM', description: `<a:loadingoogle:744334507242422302> Cargando todos los links y demas...`}})
    setTimeout(async () => {

        const e = new Discord.MessageEmbed()
        .setTitle('Links')
        .setAuthor(bot.user.tag, bot.user.displayAvatarURL())
        .setColor('RANDOM')
        .setDescription(`:one: [Hype Discord List](https://hypelist.glitch.me/bots/724749468418703432/)
        :two: [Statcord](https://statcord.com/bot/724749468418703432)`)
        let msg = await message.channel.send(e)
        
        await msg.react('1️⃣')
        await msg.react('2️⃣')
        await msg.react('🗑️')

        const filter = (reaction, user) => {return ['1️⃣','2️⃣','🗑️'].includes(reaction.emoji.name) && user.id === message.author.id}
        const collector = msg.createReactionCollector(filter, { time: 60000})

        collector.on('collect', async reaction =>{
            if(reaction.emoji.name === '1️⃣'){
                msg.reactions.cache.find(r => r.emoji.name == '1️⃣').users.remove(message.author.id).catch(() => {})

                const e = new Discord.MessageEmbed()
                .setAuthor(bot.user.tag, bot.user.displayAvatar)
                .setDescription('Api In Proccess...')

                msg.edit(e)
                collector.stop()

            }else if(reaction.emoji.name === '2️⃣'){
                msg.reactions.cache.find(r => r.emoji.name == '2️⃣').users.remove(message.author.id).catch(() => {})

                let pet = await fetch(`https://bots.discordlabs.org/v2/bot/${bot.user.id}`, {method: 'GET'})
                let json = await pet.json()

                const e = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(bot.user.tag, bot.user.displayAvatar)
                .setDescription(json.sdescription)
                .addField(`**Votos**`, json.votes, true)
                .addField(`**Servidores**`, json.server_count, true)
                .addField(`**Descripcion Larga**`, json.ldescription)
                
                msg.edit(e)

                collector.stop()
            }else {
                collector.stop()
            }
        })

        collector.on('end', () => {return msg.reactions.removeAll()})

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