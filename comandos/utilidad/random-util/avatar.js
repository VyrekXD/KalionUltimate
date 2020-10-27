const Discord = require('discord.js');

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
guildOnly: true,
run: async(client, message, args) => {

let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      client.users.cache.find(x =>
        args ? x.tag === args.join(" ") : undefined
      ) ||
      message.author;

    const embed = new Discord.MessageEmbed()
      .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
      .setColor(message.guild.member(user).displayHexColor)
      .setDescription(`[Avatar URL](${user.displayAvatarURL({ dynamic: true })})`)
      .setTitle(
        message.author == user
          ? `Avatar de: ${user.tag}`
          : `Avatar de: ${user.tag}`
      );

    message.channel.send({ embed: embed });
}
}
module.exports.help = {
  name: 'avatar',
  description: 'Un comando para que te aparezca el avatar',
  cooldown: 0,
  usage: 'avatar {mencion}',
  example: 'avatar @NoobLance'
}