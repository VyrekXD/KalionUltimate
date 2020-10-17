const Discord = require('discord.js');
const prefixModel = require('../../database/models/guildPrefix')

module.exports = {
aliases: ['allfilters','afilters'],
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','CONNECT','SPEAK'],
run: async (client, message, args) => {
    
    let res = await prefixModel.findOne({servidor: message.guild.id}).exec()
    let prefix = res ? res.prefix : 'k!'

    const enabledEmoji = client.emotes.success;
    const disabledEmoji = client.emotes.error;

    const filtersStatuses = [ [], [] ];

    Object.keys(filters).forEach((filterName) => {
        const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
        array.push(filters[filterName] + " : " + (client.player.getQueue(message.guild.id).filters[filterName] ? enabledEmoji : disabledEmoji));
    });

    //List embed
    const list = new Discord.MessageEmbed()
    .setDescription(`Lista de filtros activados y desactivados.\nPara añadir un filtro usa \`${prefix}filter\``)
    .addField("**Filters**", filtersStatuses[0].join('\n'), true)
    .addField("** **", filtersStatuses[1].join('\n'), true)
    .setColor(client.colors.succes);

    message.channel.send(list)

}
}

module.exports.help = {
name: 'all-filters',
description: 'Muestra los filtros de las canciones',
cooldown: [5],
alias: ['allfilters','afilters'],
usage: 'allfilters',
example: 'allfilters'
}