const math = require("math-expression-evaluator"); // Este NPM es con el que se podrá hacer los calculos
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  guildOnly: true,
  run: async(client, message, args) => { 
      
    const embed = new Discord.MessageEmbed()
  .setColor(`RANDOM`);
  
  if (!args[0]) {
    embed.setFooter("Por favor ingrese una `expresion`.");
    return await message.channel.send(embed); // Devuelve un mensaje si es que ejecuta el comando sin nada
  }
  let resultado;
  try {
    resultado = math.eval(args.join(" ")); // El Args toma el calculo
  } catch (e) {
    resultado = "error: Entrada Invalida"; // Cuando es incorrecta
  }
  embed.addField("Entrada:", `\`\`\`js\n${args.join(" ")}\`\`\``, false) // Te da el calculo
  .setTitle("📊 Calculadora 📊")
  .setFooter("Comando solicitado por: "+ message.author.username)
  .addField("Salida", `\`\`\`js\n${resultado}\`\`\``, false);
  
  await message.channel.send(embed);
}
}