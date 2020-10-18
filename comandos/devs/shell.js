const Discord = require('discord.js');
const { execSync } = require('child_process')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
run: async (bot, message, args, send) => {

    if(!args)return send(`Y el comando? :eyes:`)

    try {

        let command = execSync(args.join(' '))
        if(command > 1900){
            return send(command.slice(0, 1850), { code: 'sh'})
        }

        send(command, {code: '', split: { maxLength: 1900}})

    } catch(err) {
        let e = new Discord.MessageEmbed()
        .setTimestamp()
        .setFooter(bot.user.username, bot.user.displayAvatarURL)
        .addField("<a:no4:758028512933445714> Error", "```js\n"+err+"```")
        .setColor("RANDOM")
        send(e)
    }
    }
}

