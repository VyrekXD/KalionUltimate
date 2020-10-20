const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  guildOnly: true,
  run: async(client, message, args) => {
    let frases = [
      "**" + message.author.username +"**" +", Esta muy enojado talvez sera mejor dejarlo en paz :c",
      "**" + message.author.username +"**" +", Esta muy enojado corran de el TnT"
      
    ];
    const images = require("../../util/gifs/dancegif.json")

    const captura = images[Math.floor(Math.random() * images.length)]

    let frase = frases[Math.floor(frases.length * Math.random())]
     
    const embed = new Discord.MessageEmbed()
      .setDescription(frase)
      .setColor("RANDOM")
      .setImage(captura);
      
    message.channel.send(embed);
}
}

module.exports.help = {
  name: 'angry',
  description: 'No estes enojado pana :(',
  cooldown: [],
  alias: [],
  usage: 'angry',
  example: 'angry'
  }