const Discord = require('discord.js');

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  guildOnly: true,
  run: async(client, message, args, send) => {

    const images = require("../../util/gifs/run.json")

    let miembro = message.mentions.users.first();

    const captura = images[Math.floor(Math.random() * images.length)]
    
    if(miembro){
    if(miembro.id === message.author.id)return send("**" +message.author.username + "**" + ", Eres don comedia acaso? No puedes correr de ti mismo XD.");
    if(miembro.id === client.user.id)return send("**" +message.author.username + "**" + ", Intentas huir de mi? unu");
    }

    if(!miembro){
          const embed = new Discord.MessageEmbed()
      .setDescription("**" + message.author.username +"**" +", Corre por tu vida! :0")
      .setColor("RANDOM")
      .setImage(captura);
      
    return send(embed);
    }
      const embed = new Discord.MessageEmbed()
      .setDescription("**" + message.author.username + "**"+ "Intenta correr lo mas lejos que puede de "+ "**" + miembro.username + "**")
      .setColor("RANDOM")
      .setImage(captura);
      
    send(embed);
}
}

module.exports.help = {
name: 'run',
description: 'Corre!!',
cooldown: [],
alias: [],
usage: 'run (Usuario)',
example: 'run @VYREK'
}