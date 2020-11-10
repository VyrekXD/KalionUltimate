const Discord = require('discord.js');

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  guildOnly: true,
  run: async(client, message, args) => {
    
      var server = message.guild;
    const verificationLevels = {
      "NONE":"Ninguna ٩(˘◡˘)۶",
      "LOW":"Baja ┬─┬ ノ( ゜-゜ノ)",
      "MEDIUM":"Medio (╯°□°）╯︵ ┻━┻",
      "HIGH":"Alto ┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻"
      
      }
    const boostedlevels = {
      "0":"<a:nitro:775776708195516436> No, no esta boosteado",
      "1":"<a:nitro:775776708195516436> Si, esta boosteado, Su nivel es: 1",
      "2":"<a:nitro:775776708195516436> Si, esta boosteado, Su nivel es: 2",
      "3":"<a:nitro:775776708195516436> Si, esta boosteado, Su nivel es: 3",
      
    }
    const embed = new Discord.MessageEmbed()
      .setThumbnail(server.iconURL())
      .setAuthor(server.name, server.iconURL())
      .addField("ID: ", server.id, true)
      .addField("Region: ", server.region, true)
      .addField("Creado el: ", server.joinedAt.toDateString(), true)
      .addField(
        "Dueño del Servidor: ",
        server.owner.user.tag + " (" + server.owner.user.id + ")",
        true
      )
    .addField("Nivel de seguridad: ", verificationLevels[message.guild.verificationLevel], true)
      .addField("Miembros: ", server.memberCount, true)
      .addField("Roles: ", server.roles.cache.size, true)
      .addField("A que nivel esta boosteado: ", boostedlevels[message.guild.premiumTier], true)
      .setColor("RANDOM");

    message.channel.send(embed);

}
}