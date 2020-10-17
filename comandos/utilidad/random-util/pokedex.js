const Discord = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: ['dex'],
run: async (bot, message, args, send) => {

    if(!args[0])return send('Tienes que poner un pokemon!')

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${args.join('-').toLowerCase()}/`, {method: 'GET'})

    if(res.status === 404)return send(`Pokemon no encontrado`)

    const json = await res.json()

    const resAb = await fetch(json.abilities[0].ability.url, {method: 'GET'})
    const json1 = await resAb.json()
    const jsonAb = json1.effect_entries[1]

    const e = new Discord.MessageEmbed()
    .setTitle(`${json.name} #${json.id}`)
    .setColor('RANDOM')
    .setThumbnail(json.sprites.front_default)
    .addField(`**Tipo**`, json.types[0].type.name, true)
    .addField(`**Peso**`, json.weight, true)
    .addField(`**Altura**`, json.height, true)
    .addField(`**XP Base**`, json.base_experience, true)
    .addField(`**Abilidad**`, jsonAb.effect.slice(0, 1000)+'...')
    .addField(`**Efecto Rapido**`, jsonAb.short_effect)

    send(e)

    }
}

module.exports.help = {
name: 'pokedex',
description: 'Encuentra un pokemon que te guste uwu',
cooldown: [],
alias: ['dex'],
usage: 'pokedex [Pokemon]',
example: 'pokedex arceus'
}