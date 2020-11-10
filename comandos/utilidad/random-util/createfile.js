const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
 
module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
run: async (bot, message, args, send) => {

    if(!args[0])return send(`Ingresa texto`)
    if(!args[1])return send(`Ingresa texto `)

    let name = args.join(' ').split("--name ").slice(1) || 'message'
    let txt = args.join(' ')
    name === 'message' ? '' : txt.replace(name)

    send(new Discord.MessageAttachment(txt, name))
   }
}

module.exports.help = {
name: 'createfile',
description: 'Crea un archivo con el texto pedido',
cooldown: [],
alias: [],
usage: 'createfile [texto] (--name [nombre de el archivo])',
example: 'createfile aaaaa --name nombre._.XD'
}