const Discord = require('discord.js');
const cmod = require('../../database/models/guildConfig')

module.exports.run = async(bot, guild) => {
    
    let canal = bot.channels.resolve("748547036139225229");

    const e = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle(`Kalion Ultimate`)
    .setDescription(`Me sacaron de un servidor`)
    .addField(`**Servidor**`, `${guild.name}\n${guild.id}`)
    .addField(`Server owner:`, servidor.owner.user.tag)
    .setImage(servidor.iconURL() || "https://cdn.discordapp.com/attachments/721128332959285258/734918997308604426/imagen-no.png")

    canal.send(e)

    await cmod.deleteOne({guildID: guild.id})
}