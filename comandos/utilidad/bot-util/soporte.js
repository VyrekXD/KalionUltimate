const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  run: async(client, message, args) => {
    
      const embed = new Discord.MessageEmbed()
      .setTitle("Server de soporte del Bot")
      .setDescription(
        "[Entra al server de soporte en este link](https://discord.gg/3RdZ9mD)"
      )
      .setColor("RANDOM")
      .setFooter("Server de soporte Unete!", client.user.avatarURL());
    message.channel.send(embed);
  
}
}