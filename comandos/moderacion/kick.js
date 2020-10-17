const Discord = require('discord.js');
const { checkPerms } = require('../../util/Functions/checkPermissions')

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','KICK_MEMBERS'],
  run: async(client, message, args) => {
let user = message.mentions.users.first();
    let razon = args.slice(1).join(" ");

    var perms = message.member.hasPermission("KICK_MEMBERS");

    const embed = new Discord.MessageEmbed()
      .setTitle("<a:error:721475630688108554> ERROR Permisos Insuficientes")
      .setThumbnail(
        "https://media.giphy.com/media/3osxY9kuM2NGUfvThe/giphy.gif"
      )
      .setDescription("Permisos insuficientes para ejecutar este comando ")
      .setColor("RANDOM");

    if (!perms) return message.channel.send(embed);
    if (message.mentions.users.size < 1)
      return message
        .reply("Debes mencionar al miembro que quieres expulsar.")

    razon = args.slice(1).join(" ");

    if (!razon) {
      razon = `No hay una razon especificada`;
    }
    let persona = message.mentions.members.first();

    if (!message.guild.member(user).kickable)
      return message.reply("No puedo expulsar al usuario mencionado.");

    message.guild.member(user).kick(razon)
    message.channel.send(`**${persona.user.tag}**, fue expulsado correctamente del servidor, razon: ${razon}.`)
    
}
}