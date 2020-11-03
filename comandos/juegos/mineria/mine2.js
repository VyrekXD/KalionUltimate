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
 
    let cf = await coolModel.findOne({guildID: message.guild.id, userID: message.author.id})
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