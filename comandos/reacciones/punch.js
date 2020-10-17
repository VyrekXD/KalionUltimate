const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  run: async(client, message, args) => {
    const images = require("../../util/gifs/dancegif.json")

    let miembro = message.mentions.users.first();

    const captura = images[Math.floor(Math.random() * images.length)]
    
  if(miembro.id === message.author.id)return message.channel.send("**" +message.author.username + "**" + ", Estas loco no te pegues a ti mismo respetate nwn.");
  
  if(miembro.id === client.user.id)return message.channel.send("**" +message.author.username + "**" + ", No querras pegarme a mi... >:C");

  if(!miembro){
          const embed = new Discord.MessageEmbed()
      .setDescription("**" + message.author.username +"**" +", No te puedes pegar a ti mismo loco unu")
      .setColor("RANDOM")
      .setImage(captura);
      
    message.channel.send(embed);
    }
      const embed = new Discord.MessageEmbed()
      .setDescription("**" + message.author.username + "**"+ ", Le da un puñetazo a "+ "**" + miembro.username + "**")
      .setColor("RANDOM")
      .setImage(captura);
      
    message.channel.send(embed);
}
}