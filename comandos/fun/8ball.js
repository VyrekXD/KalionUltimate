const Discord = require('discord.js');

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  run: async(client, message, args) => {
let rpts = [
      "Sí",
      "No",
      "Tal vez",
      "No sé",
      "Para nada",
      "Claro!",
      "Yo digo que si",
      "No estoy de acuerdo",
      "Acaso no es obvio?",
      "Yo digo que no, tu que dices?",
      "Tzz tzz sistema fallando xD",
      "Yo digo que pues si"
    ];

    if (!args) return message.reply(`Escriba una pregunta.`);
    let usuario = message.member.user;
    const embed = new Discord.MessageEmbed()
      .setTitle(usuario.tag + ", Pregunta: " )
      .setDescription(args.join(" "))
      .setColor("RANDOM")
      .addField(
        "Mi respuesta es: ", 
          "**" +
          rpts[Math.floor(Math.random() * rpts.length)] +
          "**"
      );

    message.channel.send(embed);

}
}

module.exports.help = {
name: '8ball',
description: 'Te responde tus preguntas uwu',
cooldown: [],
alias: [],
usage: '8ball [Pregunta]',
example: '8ball eri gay?'
}