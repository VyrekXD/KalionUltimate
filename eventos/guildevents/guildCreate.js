const Discord = require('discord.js');

module.exports.run = bot => {
    bot.on("guildCreate", async guild => {
      let canal = bot.channels.cache.get("748547036139225229");
      let servidor = guild;
    
      let newserver = new Discord.MessageEmbed()
      .setTitle(`Hola soy Kalion Ultimate!`)
      .setDescription(`Me han añadido a un nuevo servidor!`)
      .addField(`Nombre del server:`, servidor.name)
      .addField(`Server owner:`, servidor.owner.user.tag)
      .setImage(servidor.iconURL() || "https://cdn.discordapp.com/attachments/721128332959285258/734918997308604426/imagen-no.png")
      .addField(`Miembros del server:`, servidor.memberCount)
      .addField("Invitame a tu servidor!", '[Link de invitacion](https://discord.com/api/oauth2/authorize?client_id=724749468418703432&permissions=8&scope=bot)')
      .setColor('bd0e0e')
      .setFooter("Kalion Games Bot", bot.user.avatarURL())
      
      canal.send(newserver);
      
      let primercanal = servidor.channels.cache.filter(c => c.type != ("voice","category")).first()
      
      let emved = new Discord.MessageEmbed()
      .setTitle(`Gracias por elegirme!`)
      .setDescription('Hola! '+ servidor.owner.user.tag + ' soy un bot de moderacion y juegos y mas cosas usa `k!help` para empezar :D')
      .setColor("RANDOM")
      .setImage(servidor.iconURL() || "https://cdn.discordapp.com/attachments/721128332959285258/734918997308604426/imagen-no.png")
      .addField(
        "Link que te pueden interesar",
        "[Server de soporte](https://discord.gg/eK53y53)\n[Invitacion del bot](https://discord.com/api/oauth2/authorize?client_id=724749468418703432&permissions=8&scope=bot)\n[Patreons](https://www.patreon.com/vyrekxd)\n[Bot en Discord Bots List](https://discordbotlist.com/bots/kalion-ultimate)"
      )
      .setFooter("Gracias por elegirme", bot.user.avatarURL())
      bot.channels.cache.get(primercanal.id).send(emved)
    
})
}