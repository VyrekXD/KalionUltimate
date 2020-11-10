const Discord = require('discord.js');
const { meme } = require('memejs');

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
run: async (bot, message, args, send) => {


        
        await meme(async function(err, data) {
            if (err) return console.error(err);
            let e = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`[${data.title}](${data.url})`)
            .setImage(data.url)
            .setFooter(`Autor: ${data.author}`)
        
           send(e)
          });


    }
}

module.exports.help = {
name: 'meme',
description: 'Te da un meme random, tristemente en ingles',
cooldown: [],
alias: [],
usage: 'meme',
example: 'meme'
}