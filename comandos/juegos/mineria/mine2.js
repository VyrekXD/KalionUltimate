const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const Duration = require("humanize-duration");
const mineriaModel = require('../../../database/models/mineria')
const coolModel = require('../../../database/models/userCooldowns')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
guildOnly: true,
run: async (bot, message, args, send) => {
 
    let cul = await message.author.getCooldown(message.guild.id)

    if(cul?.cooldowns.mine){
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
}

module.exports.help = {
name: 'mine',
description: 'Mina hasta el cansancio',
cooldown: ['40 (Default)'],
alias: [],
usage: 'mine',
example: 'mine'
}