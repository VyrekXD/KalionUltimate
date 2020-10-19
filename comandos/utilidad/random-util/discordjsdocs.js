const Discord = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
guildOnly: true,
aliases: [],
run: async (bot, message, args, send) => {

    let src = "";
    let cont = "";
    if (["stable", "master", "commando", "rpc", "akairo", "akairo-master", "collection"].includes(args[1])) {
      src = args[1];
      cont = args.slice(2).join(" ");
    } else {
      src = "stable";
      cont = args.slice(1).join(" ");
    }

    const r = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=${encodeURIComponent(src)}&q=${encodeURIComponent(cont)}`)
    const res = await r.json();

    if (!res) return send(`No encontre nada :(`)
    if (res.error) return message.channel.send(new Discord.MessageEmbed().setTitle("Error " + res.status).setDescription(res.error + ": " + res.message));

    await send(new Discord.MessageEmbed(res));
    
    }
}

module.exports.help = {
name: 'discordjsdocs',
description: 'DiscordJS docs',
cooldown: [],
alias: ['djsdocs','djsd'],
usage: 'djsd (version) [query]',
example: 'djsd master Client#fetchInvites'
}