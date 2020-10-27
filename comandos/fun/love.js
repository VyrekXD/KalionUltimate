const Discord = require('discord.js');

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  guildOnly: true,
  run: async(client, message, args) => {
    let users = message.mentions.users.map(m => m.username).join(" y ");
    if (!users)
      return message.channel.send("Mencione a dos usuarios para calcular");
    let user = message.author

    const random = Math.floor(Math.random() * 100);
    let heard = "";
    let heart = ""  
  
    if (random < 40) {
      heard = ":broken_heart:";
    } else if (random < 70) {
      heard = ":sparkling_heart: ";
    } else if (random < 101) {
      heard = ":heart:";
    }
  
    if (random < 20){
      heart = ":hearts:hearts::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart:"
    } else if (random < 40){
      heart = ":hearts::hearts::hearts::hearts::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart:"
    } else if (random < 60){
      heart = ":hearts::hearts::hearts::hearts::hearts::hearts::black_heart::black_heart::black_heart::black_heart:"
    } else if (random < 80){
      heart = ":hearts::hearts::hearts::hearts::hearts::hearts::hearts::hearts::black_heart::black_heart:"
    } else if (random < 101){
      heart = ":hearts::hearts::hearts::hearts::hearts::hearts::hearts::hearts::hearts::hearts:"
    }

    message.channel.send(user.mention + "\n El amor entre "+ users + " es:"+ "\n"+ heard + " **" + random + " %**" + heard + "\n" + "\n El amor de ellos: " + "\n " + heart);
}
}

module.exports.help = {
name: 'love',
description: 'Calcula el amor entre dos usuarios',
cooldown: [],
alias: [],
usage: 'love [Usuarios] ',
example: 'love @VyrekXD @NoobLance'
}