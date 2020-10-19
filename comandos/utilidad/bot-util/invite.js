const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  guildOnly: true,
  run: async(client, message, args) => {
      
    const embed = new Discord.MessageEmbed()
      .setTitle("Invita a este bot!")
      .setDescription(
        "[Invitacion del bot](https://discord.com/api/oauth2/authorize?client_id=724749468418703432&permissions=8&scope=bot)"
      )
      .setColor("RANDOM")
      .setFooter("Invitacion del bot", client.user.avatarURL());
    message.channel.send(embed);
}
}