const Discord = require('discord.js');
const client = new Discord.Client();
const { checkPerms } = require('../../util/Functions/checkPermissions')

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','MANAGE_ROLES'],
  run: async(client, message, args) => {

    if(!checkPerms(message.member, 'MANAGE_ROLES'))return message.channel.send(`Permisos insuficientes`)

    if (!message.member.hasPermission("MANAGE_ROLES")) {
      const embed4 = new Discord.MessageEmbed()
        .setTitle("<a:error:721475630688108554> ERROR Permisos Insuficientes")
        .setThumbnail(
          "https://media.giphy.com/media/3osxY9kuM2NGUfvThe/giphy.gif"
        )
        .setDescription("Permisos insuficientes para ejecutar este comando ")
        .setColor("RANDOM");

      return message.channel.send(embed4);
    }

    let persona = message.mentions.members.first();
    if (!persona) return message.channel.send("Debes mencionar a alguien.");

    let nombrerol = message.mentions.roles.first();
    if (!nombrerol) return message.channel.send("Debes mencionar el rol");

    let rol = message.guild.roles.cache.get(nombrerol.id);

    if (!rol) {
      return message.channel.send("El rol no se ha encontrado en el servidor.");
    } else if (!rol.editable) {
      return message.channel.send(
        "No puedo darle/quitarle ese rol a nadie ya que esta arriba de mi."
      );
    } else if (rol.comparePositionTo(message.member.roles.highest) > 0) {
      return message.channel.send(
        "Ese rol es mayor que tu en la jerarquia del server no podras darselo/quitar a nadie."
      );
    }

    if (persona.roles.cache.has(rol.id)) {
      persona.roles
        .remove(rol)
        .then(() => {
          const embed = new Discord.MessageEmbed()
            .setDescription(
              `:white_check_mark: Roles cambiados para **${persona.user.username}** - ${rol.name}`
            )
            .setColor("#0eaf19");
          message.channel.send(embed);
        })
        .catch(e => message.reply("Ocurrio un **error**"));
    } else {
      persona.roles
        .add(rol)
        .then(() => {
          const embed = new Discord.MessageEmbed()
            .setDescription(
              `:white_check_mark: Roles cambiados para **${persona.user.username}** + ${rol.name}`
            )
            .setColor("#0eaf19");
          message.channel.send(embed);
        })
        .catch(e => message.reply("Ocurrio un **error**"));
    }
  
}
}