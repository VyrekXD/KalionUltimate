const Discord = require('discord.js');
const child_procces = require('child_process')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
run: async (bot, message, args, send) => {

    if(!args)return send(`Y el comando? :eyes:`)

    child_procces.exec(args.join(' '), (err, data) => {
        if(err){
        let embed2 = new Discord.MessageEmbed()
        .setTimestamp()
        .setFooter(bot.user.username, bot.user.displayAvatarURL)
        .addField("<a:no4:758028512933445714> Error", "```js\n"+err+"```")
        .setColor("RANDOM")
        return send(embed2)
        }

        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("<a:yes4:758028497456332903> Shell")
        .addField("Comando:", "```js\n"+beautify(args.join(" "), { format: "js" })+"```")
        .addField("Salida:", "```js\n"+data+"```")
        message.channel.send(embed)
    })
    }
}

