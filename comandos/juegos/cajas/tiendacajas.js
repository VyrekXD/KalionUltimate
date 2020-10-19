const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    aliases: ['tcajas'],
    guildOnly: true,
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    run: async(client, message, args) => {

    const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setTitle(`Tienda De Cajas`)
    .setFooter(`Para comprar una caja usa k!buy [nombre de la caja]`)

    message.channel.send(embed)
    }
}
