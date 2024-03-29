const Discord = require('discord.js');
const devModel = require('../../database/models/developers')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: ['aeval','aseval','ae'],
run: async (bot, message, args, send) => {

  let consulta = await devModel.findOne({userID: message.author.id})
    
  if(!consulta){
      return message.channel.send(`Solo **Developers** pueden usar este comando!`)
  }
  let beautify = require("beautify")
  let toEval = args.join(" ")
        if(!toEval) {
            let embed = new Discord.MessageEmbed()
            .setDescription("Y el code? :eyes:")
            .setColor("RANDOM")
            message.channel.send(embed)
            .then(m => m.delete({timeout: 1000}))
            return
        }

        try {
        
        let evaluated = await eval("(async () => { " + toEval + "})();")
        
        if(typeof(evaluated) !== String)evaluated = require('util').inspect(evaluated, {depth: 0, showHidden: true});

        const regex = new RegExp(bot.token, 'gi');
        
        evaluated = evaluated.replace(regex, 'Que ves pinche chismoso >:(')

        if(evaluated.length > 1024){
          let embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTimestamp()
          .setFooter(bot.user.username, bot.user.displayAvatarURL)
          .setTitle("<a:yes4:758028497456332903> Eval")
          .addField("Codigo:", "```js\n"+beautify(args.join(" "), { format: "js" })+"```")
          .addField("Lo evaluado:", "```js\nVe tus md voludo"+"```")
          message.channel.send(embed)

          return message.author.send(`${evaluated}`,  {code: 'js', split: {maxLength: 1015, char: ''}})
        }

        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(bot.user.username, bot.user.displayAvatarURL)
        .setTitle("<a:yes4:758028497456332903> Eval")
        .addField("Codigo:", "```js\n"+beautify(args.join(" "), { format: "js" })+"```")
        .addField("Lo evaluado:", "```js\n"+evaluated+"```")
        message.channel.send(embed)
    } catch(err) {
       let embed2 = new Discord.MessageEmbed()
       .setTimestamp()
       .setFooter(bot.user.username, bot.user.displayAvatarURL)
       .addField("<a:no4:758028512933445714> Error", "```js\n"+err+"```")
       .setColor("RANDOM")
       message.channel.send(embed2) 
    }
  }
}

module.exports.help = {
  name: 'asynceval',
  aliases: ['aeval','aseval','ae'],
}