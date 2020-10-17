const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','BAN_MEMBERS'],
  run: async(client, message, args) => {
  
      if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
      return message.channel.send("No tengo los permisos suficientes");
    }

    if (!message.member.hasPermission("BAN_MEMBERS")) {
      const embed = new Discord.MessageEmbed()
        .setTitle("<a:error:721475630688108554> ERROR Permisos Insuficientes")
        .setThumbnail(
          "https://media.giphy.com/media/3osxY9kuM2NGUfvThe/giphy.gif"
        )
        .setDescription("Permisos insuficientes para ejecutar este comando ")
        .setColor("RANDOM");
      return message.channel.send(embed);
    }

    let user = message.mentions.members.first();
    if (!user) {
      return message.channel.send("Menciona el usuario que deseas banear.");
    } else if (
      user.roles.highest.comparePositionTo(message.member.roles.highest) > 0
    ) {
      return message.channel.send(
        "Permisos insufucientes el usuario mencionado es de un puesto mas alto que el tuyo en la jerarquia."
      );
    }

    var razon = args.slice(1).join(" ");
    if (!razon) {
      razon = `No hay una razon especificada`;
    }

    razon = razon + `, Ha sido baneado correctamente por ${message.author.tag}`;

    message.guild.members
      .ban(user, { reason: razon })
      .catch(e => message.reply("Ocurrio un **error** desconocido"));
    message.channel.send(
      `**${(user.username, user.id)}** A sido baneado correctamente`
    );
  
}
}