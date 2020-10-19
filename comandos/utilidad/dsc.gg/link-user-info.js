const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: ['luinfo'],
run: async (bot, message, args, send) => {

    let user = message.mentions.users.first() || bot.users.resolve(args[0])

    if(!user)return send('Menciona o pan la ID de un usuario!')

    const pet = await fetch(`https://dsc.gg/api/info/`+user.id, {method: 'GET'}).catch(err => {
        return send('Hubo un error!```\n'+err+'```')
    })

    if(pet.status === 404)return send('No se encontro ese Usuario!')
    if(res.status !== 200)return send('Hubo un error! Codigo:'+res.status)

    const info = res.json()

    const a = {
        true:'Si tiene premium',
        false:'No tiene premium'
    }

    const e = new MessageEmbed()
    .setColor('BLUE')
    .setAuthor(user.tag, user.displayAvatarURL())
    .addField('**Premium**', a[info.premium])
    .addField('**Links**', info.links)

    send(e)
    }
}

module.exports.help = {
name: 'link-user-info',
description: 'Obtienes la informacion de un usuario de: https://dsc.gg',
cooldown: [],
alias: ['luinfo'],
usage: 'luinfo [user]',
example: 'luinfo @VYREK'
}