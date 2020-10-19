const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  guildOnly: true,
  run: async(client, message, args) => {

    const images = require("../../util/gifs/hug.json")

    let miembro = message.mentions.users.first();

    const captura = images[Math.floor(Math.random() * images.length)]
    
    if (!miembro){
      const embed = new Discord.MessageEmbed()
      .setDescription("Toma un abrazo mio x3, "+ "**" +message.author.username+ "**")
      .setColor("RANDOM")
      .setImage(captura);
      
      return message.channel.send(embed);
    }
        if(miembro.id === client.user.id) {
    const embed1 = new Discord.MessageEmbed()
      .setDescription("Awww gracias por el abrazo x3, " + "**" +message.author.username+ "**" )
      .setColor("RANDOM")
      .setImage(captura);
    
    message.channel.send(embed1);
      return;
  }
            if(miembro.id === message.author.id) {
    
    message.channel.send("Acabas de intetar abrazarte a ti mismo? Eres raro...");
      return;
  }
    const embed = new Discord.MessageEmbed()
    
      .setDescription( "**" +message.author.username+ "**"  + ", abrazo a " +  "**" +miembro.username+ "**"  + ", aww se ven bien juntos >///<")
      .setColor("RANDOM")
      .setImage(captura);

    message.channel.send(embed);
}
}