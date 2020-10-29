const Discord = require('discord.js');

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  guildOnly: true,
  run: async(client, message, args, send) => {
    const images = require("../../util/gifs/punch.json")

    let miembro = message.mentions.users.first();

    if(!miembro)return send(`A quien quieres glopear... u,n,u`)
    const captura = images[Math.floor(Math.random() * images.length)]
    
    if(miembro.id === message.author.id)return message.channel.send("**" +message.author.username + "**" + ", Estas loco no te pegues a ti mismo respetate nwn.");
  
    if(miembro.id === client.user.id)return message.channel.send("**" +message.author.username + "**" + ", No querras pegarme a mi... >:C");

      const embed = new Discord.MessageEmbed()
      .setDescription("**" + message.author.username + "**"+ ", Le da un puñetazo a "+ "**" + miembro.username + "**")
      .setColor("RANDOM")
      .setImage(captura);
      
    message.channel.send(embed);
}
}