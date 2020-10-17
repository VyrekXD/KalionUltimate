const Discord = require('discord.js');
const Client = require('fortnite');
const fortnite = new Client('e59b759c-0117-430f-aa6f-74352c85810f');

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: ['fstore'],
run: async (bot, message, args) => {

    let store = await fortnite.store()
    console.log(store)
    }
}

module.exports.help = {
name: 'fortnitestore',
description: 'Ve la tienda de fortnite!',
cooldown: [],
alias: ['fstore'],
usage: 'fstore',
example: 'fstore'
}