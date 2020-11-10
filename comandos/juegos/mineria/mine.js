const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const Duration = require("humanize-duration");
const frases = require('../../../util/Functions/frases')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
guildOnly: true,
run: async (bot, message, args, send) => {
    return send(`Reconstruyendo comando`)
    let cul = await message.author.getCooldown(message.guild.id)

    if(cul){
        if(cul.cooldowns.mine){
            if(Date.now() < cul.cooldowns.mine){
                const remaining = Duration(cul.cooldowns.mine - Date.now(), { units: ['h','m','s'], language: 'es', conjunction: ' y ', serialComma: false, round: true})
                return send(`Necesitas esperar ${remaining}, para volver a usar el comando`).then(async(msg)=> {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000);
                })
            }
        }
    }
    
    const usuario = message.author;

    const e = new Discord.MessageEmbed()
    .setAuthor(usuario.tag, usuario.displayAvatarURL())
    .setDescription(`Empiezas a minar...`)
    .setColor('f0e8e8')
    .setFooter(frases)

    let msg = await send(e)

    let i = ['piedra','piedra','piedra','piedra','piedra','carbon','carbon','carbon','hierro','esmeralda','diamante','zafiro','ruby']
    let c = i[Math.floor(i.length * Math.random())]
    let ef;

    switch (c) {
        case 'piedra':
            let c7 = Math.floor(Math.random() * 100) + 1
            ef = new Discord.MessageEmbed()
            .setAuthor(usuario.tag, usuario.displayAvatarURL())
            .setDescription(`Encontraste:\n<:piedra:741084392696446976> Piedra: ${c7}`)
            .setColor('6b6969')
            .setFooter(`Dato Curioso: Es piedra -_-`)

            await message.author.setMineral(message.guild.id, 'piedra', c7)
            break;
        case 'carbon':
            
            let c6 = Math.floor(Math.random() * 75) + 1
            ef = new Discord.MessageEmbed()
            .setAuthor(usuario.tag, usuario.displayAvatarURL())
            .setColor('2b2727')
            .setDescription(`Encontraste:\n<:carbon:741084392444919980> Carbon: ${c6}`)
            .setFooter(`Dato Curioso: Si el carbon se calienta a cierta temperatura se puede crear diamante O.o`)

            await message.author.setMineral(message.guild.id, 'carbon', c6)
            break;
        case 'hierro':
            
            let c5 = Math.floor(Math.random() * 80) + 1
            ef = new Discord.MessageEmbed()
            .setAuthor(usuario.tag, usuario.displayAvatarURL())
            .setDescription(`Encontraste:\n<:ironingot:741084392927002755> Hierro: ${c5}`)
            .setColor('6b6969')
            .setFooter(`Dato Curioso: El hierro fue unos de los primeros materiales encontrados`)

            await message.author.setMineral(message.guild.id, 'hierro', c5)
            break;
        case 'esmeralda':

            let c4 = Math.floor(Math.random() * 30) + 1
            ef = new Discord.MessageEmbed()
            .setAuthor(usuario.tag, usuario.displayAvatarURL())
            .setColor('28a012')
            .setDescription(`Encontraste:\n<:esmeralda:741084391983415398> Esmeralda: ${c4}`)
            .setFooter(`Dato Curioso: Las esmeraldas son tan raras que se toleran inclusiones`)

            await message.author.setMineral(message.guild.id, 'esmeralda', c4)
            break;
        case 'diamante':
            
            let c1 = Math.floor(Math.random() * 30) + 1
            ef = new Discord.MessageEmbed()
            .setAuthor(usuario.tag, usuario.displayAvatarURL())
            .setColor('2287b8')
            .setDescription(`Encontraste:\n<:diamante:741084392667217950> Diamante: ${c1}`)
            .setFooter(`Dato Curioso: Aunque se dice que el diamante es la piedra preciosa mas rara es mentira hay piedras preciosas mas raras y caras`)

            await message.author.setMineral(message.guild.id, 'diamante', c1)
            break;
        case 'zafiro':
            
            let o = Math.floor(Math.random() * 3) + 1

            if(o === 2){
                ef = new Discord.MessageEmbed()
                .setAuthor(usuario.tag, usuario.displayAvatarURL())
                .setDescription(`Encontraste:\n<:zafiro:741084392449114183> Zafiro, Oh no el zafiro esta dañado D;`)
                .setColor('af1b18')
                .setFooter(`Dato curioso: Si tienes una piedra preciosa pero se te daña el valor disminuye muchisimo o literalmente ya no vale nada`)
                
            }else {
                let c3 = Math.floor(Math.random() * 7)
                ef = new Discord.MessageEmbed()
                .setAuthor(usuario.tag, usuario.displayAvatarURL())
                .setDescription(`Encontraste:\n<:zafiro:741084392449114183> Zafiro: ${c3}`)
                .setColor('264cc0')
                .setFooter(`Dato Curioso: El zafiro es la segunda piedra con un color y precio mas escepcional de el mundo`)

                await message.author.setMineral(message.guild.id, 'zafiro', c3)
            }
            
            break;
        case 'ruby':
            let u = Math.floor(Math.random() * 2) + 1
            if(u === 1){
                let c2 = Math.floor(Math.random() * 5)
                ef = new Discord.MessageEmbed()
                .setAuthor(usuario.tag, usuario.displayAvatarURL())
                .setDescription(`Encontraste:\n<:ruby:741084392490795029> Ruby: ${c2}`)
                .setColor('af1b18')
                .setFooter(`Dato curioso: El ruby es la piedra preciosa mas cara y rara de el planeta`)

                await message.author.setMineral(message.guild.id, 'ruby', c2)
            }else {
                ef = new Discord.MessageEmbed()
                .setAuthor(usuario.tag, usuario.displayAvatarURL())
                .setDescription(`Encontraste:\n<:ruby:741084392490795029> Ruby, Oh no el ruby esta dañado D;`)
                .setColor('af1b18')
                .setFooter(`Dato curioso: Si tienes una piedra preciosa pero se te daña el valor disminuye muchisimo o literalmente ya no vale nada`)
            }
            break;
    }

    setTimeout(async() => {
        await msg.edit(ef)
    }, 3000);

    await message.author.setCooldown(message.guild.id, (Date.now() + 40 * 60000), 'mine')

   }
}

module.exports.help = {
name: 'mine',
description: 'Mina hasta el cansancio',
cooldown: ['40 (Default)'],
alias: [],
usage: 'mine',
example: 'mine'
}