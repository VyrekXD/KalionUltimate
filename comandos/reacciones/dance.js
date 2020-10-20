const Discord = require('discord.js');

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  guildOnly: true,
  run: async(client, message, args) => {

    const images = require("../../util/gifs/dancegif.json")

    let miembro = message.mentions.users.first();

    const random = images[Math.floor(Math.random() * images.length)]
    
    if (!miembro){
      const embed = new Discord.MessageEmbed()
      .setDescription( "**" +message.author.username + "**" + ", Se puso a bailar bien chido")
      .setColor("RANDOM")
      .setImage(random);
      
      return message.channel.send(embed);
    }

    if(miembro.id === client.user.id)return message.channel.send("**" +message.author.username + "**" + ", No me gusta bailar jaja x3");

    if(miembro.id === message.author.id)return message.channel.send("**" +message.author.username + "**" + ", Jaja no puedes hablar contigo mismo");
    
    const embed = new Discord.MessageEmbed()
    
      .setDescription( "**" +message.author.username+ "**" + ", Quiere bailar contigo x3, "+  "**" +miembro.username+ "**" )
      .setColor("RANDOM")
      .setImage(random);

    message.channel.send(embed);

}
}

module.exports.help = {
  name: 'dance',
  description: 'Baila como un desquisiado!',
  cooldown: [],
  alias: [],
  usage: 'run (Usuario)',
  example: 'run @VYREK'
  }