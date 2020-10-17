const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  run: async(client, message, args) => {
    
      var server = message.guild;
    const verificationLevels = {
      "NONE":"Ninguna ٩(˘◡˘)۶",
      "LOW":"Baja ┬─┬ ノ( ゜-゜ノ)",
      "MEDIUM":"Medio (╯°□°）╯︵ ┻━┻",
      "HIGH":"Alto ┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻"
      
      }
    const boostedlevels = {
      "0":"<:nitro:724001775987851385> No esta boosteado",
      "1":"<:nitro:724001775987851385> Si esta boosteado, Su nivel es: 1",
      "2":"<:nitro:724001775987851385> Si esta boosteado, Su nivel es: 2",
      "3":"<:nitro:724001775987851385> Si esta boosteado, Su nivel es: 3",
      
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