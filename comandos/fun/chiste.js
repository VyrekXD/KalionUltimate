const Discord = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','MANAGE_EMOJIS'],
aliases: ['broma','joke'],
run: async (bot, message, args) => {

    const fet = await fetch('https://sv443.net/jokeapi/v2/joke/Any?lang=es&type=single', {method: 'GET'});
    const json = await fet.json()

    if(json.error === true){
        const ee = new Discord.MessageEmbed()
        .setColor('RED')
        if(json.internalError === true){
            ee.addField(`**Internal Error?**`, json.internalError)
        }
        ee.addField(`**Message**`, json.message)
        ee.addField(`**Caused By**`, json.causedBy.join(' \n'))
        ee.addField(`**Additional Info**`, json.additionalInfo)
        .addField(`**Code**`, json.code)
        .addField(`**Que hago!?**`, `Porfavor si salio este error usa \`${message.guild.getPrefix()}bugreport <codigo de el error> <caused by> <additional info> <message>\``)
        .setFooter(`Error causado a las: ${moment(json.timestamp).format('L')}`)
        
        return send(ee)
    }

    const e = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`Chiste`)
    .addField(`**Categoria**`, json.category)
    .setDescription(json.joke)

    send(e)
    }
}

module.exports.help = {
name: 'chiste',
description: 'Te da un chiste random xD',
cooldown: [],
alias: ['broma','joke'],
usage: 'chiste',
example: 'chiste'
}