const Discord = require('discord.js');
const booru = require('booru')
const nsfwModel = require('../../database/models/nsfwConfig')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: ['rule34'],
nsfw: true,
run: async (bot, message, args, send) => {

    let find = await nsfwModel.findOne({guildID: message.guild.id})
    if(find){
        if(!find.noNSFW)return send('Comandos NSFW desactivados!')
    }

    const tags = args.join(" ")
    if(!tags)return message.channel.send("Necesitas poner algo para buscar!")

    let posts = await booru.search('rule34', [tags], { limit: 5, random: true }).catch(err => {
        return message.channel.send(`Hubo un error!\n`+'```js\n'+err+'\n```')
    })

    let paginas = []
    let paginaActual = 0

    for(let post of posts) {
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Tags: ${tags}`)
        .setImage(post.fileUrl)
        paginas.push(embed)
        }

        let mensaje = await message.channel.send(paginas[0])

        await mensaje.react("⬅️")
        await mensaje.react("➡️")
        await mensaje.react("🗑️")

        const filter = (reaction, user) => {return ['⬅️','➡️','🗑️'].includes(reaction.emoji.name) && user.id === message.author.id}
        const collector = mensaje.createReactionCollector(filter, { time: 60000})

        collector.on('collect', async reaction =>{
            if(reaction.emoji.name === '➡️'){
                mensaje.reactions.cache.find(r => r.emoji.name == '➡️').users.remove(message.author.id).catch(() => {})
                if(paginaActual < paginas.length - 1){
                    mensaje.edit(paginas[++paginaActual])
                }
            }
            else if(reaction.emoji.name === '⬅️'){
                mensaje.reactions.cache.find(r => r.emoji.name == '⬅️').users.remove(message.author.id).catch(() => {})
                if(paginaActual !== 0){
                    mensaje.edit(paginas[--paginaActual])
                }
            }else {
                    collector.stop()
                }
            
        }
    )

    collector.on('end', () => {return mensaje.delete()});
    } 
}

module.exports.help = {
name: 'r34',
description: 'Busca fotos en la rule34',
cooldown: [],
alias: ['rule34'],
usage: 'r34 [tags..]',
example: 'r34 Bara'
}