const Discord = require('discord.js');
const exec = require("util").promisify(require("child_process").exec), { Util } = require("discord.js");
const devModel = require('../../database/models/developers')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
run: async (bot, message, args, send) => {

    let consulta = await devModel.findOne({userID: message.author.id})

    if(!consulta)return message.channel.send(`Solo **Developers** pueden usar este comando!`)
    

    if(!args)return send(`Y el comando? :eyes:`)

    try {
        const { stdout, stderr } = await exec(args.join(" "));
        if (!stdout && !stderr)
          return message.channel.send("Comando ejecutado correctamente pero no hay salida.");
        if (stdout) {
          const text = Util.splitMessage(stdout, { maxLength: 1950 });
          await message.channel.send(text[0], { code: "sh" });
        }
        if (stderr) {
          const text = Util.splitMessage(stderr, { maxLength: 1950 });
          await message.channel.send(text[0], { code: "sh" });
        }
      } catch (error) {
        const text = Util.splitMessage(error.toString(), { maxLength: 1950 });
        await message.channel.send(text[0], { code: "sh" });
      }

    }
}

