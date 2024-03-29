const Discord = require('discord.js');

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  guildOnly: true,
  run: async(bot, message, args, send) => {

      let elc = args[0]

      const e = new Discord.MessageEmbed()
      if(message.channel.nsfw){
        e.setThumbnail(bot.user.displayAvatarURL())
        .setTitle(`:page_facing_up: Comandos de el bot`)
        .addField(`**Updates**`, )
        .addField(`:pencil: Informacion`, `Actualmente la cantidad de comandos que tengo es: **${bot.comandos.size}**`)
        .addField(`:closed_book: Categorias:`, 
        `» \`${await message.guild.getPrefix()}help economy\`\n» \`${await message.guild.getPrefix()}help eadmin\`\n» \`${await message.guild.getPrefix()}help miner\`\n» \`${await message.guild.getPrefix()}help util\`\n» \`${await message.guild.getPrefix()}help admin\`\n» \`${await message.guild.getPrefix()}help fun\`\n» \`${await message.guild.getPrefix()}help react\`\n» \`${await message.guild.getPrefix()}help music\`\n» \`${await message.guild.getPrefix()}help nsfw\``)
        .setFooter(`Usa ${await message.guild.getPrefix()}help [Comando] Para ver informacion especial!`)
        .setColor("RED")
        .setTimestamp()
      }else {
        e.setThumbnail(bot.user.displayAvatarURL())
        .setTitle(`:page_facing_up: Comandos de el bot`)
        .addField(`:pencil: Informacion`, `Actualmente la cantidad de comandos que tengo es: **${bot.comandos.size}**`)
        .addField(`:closed_book: Categorias:`, 
        `» \`${await message.guild.getPrefix()}help economy\`\n» \`${await message.guild.getPrefix()}help eadmin\`\n» \`${await message.guild.getPrefix()}help miner\`\n» \`${await message.guild.getPrefix()}help util\`\n» \`${await message.guild.getPrefix()}help admin\`\n» \`${await message.guild.getPrefix()}help fun\`\n» \`${await message.guild.getPrefix()}help react\`\n» \`${await message.guild.getPrefix()}help music\``)
        .setFooter(`Usa ${await message.guild.getPrefix()}help [Comando] Para ver informacion especial!`)
        .setColor("RED")
        .setTimestamp()
      }

      if(elc === `economy`){
        const embed1 = new Discord.MessageEmbed()
        
        .setTitle("Comandos de Kalion Ultimate")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .addField(
          ":dollar: Economia ",
          "Para ayuda adicional entra al: \n[Servidor de soporte](https://discord.gg/3RdZ9mD)"
        )
        .addField(":page_facing_up: Comandos:", "```work | balance(bal) | deposit(dep) | withdraw(with) ```")
        .setFooter(
          `Para ver informacion detallada de un comando usa ${await message.guild.getPrefix()}help (comando)`
        )
        .setColor("RANDOM");

        message.channel.send(embed1)
      } else if(elc === `eadmin`){
        const embed2 = new Discord.MessageEmbed()

        .setTitle("Comandos de Kalion Ultimate")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .addField(
          ":gear: Economia Admin ",
          "Para ayuda adicional entra al: \n[Servidor de soporte](https://discord.gg/3RdZ9mD)"
        )
        .addField(":page_facing_up: Comandos:", "```addmoney | removemoney```")
        .setFooter(
          `Para ver informacion detallada de un comando usa ${await message.guild.getPrefix()}help (comando)`
        )
        .setColor(`RANDOM`);
        
        message.channel.send(embed2)
      } else if(elc === `nsfw`){
        if(!message.channel.nsfw) return message.channel.send(`Necesitas estar en un canal NSFW!`)

        const embed2 = new Discord.MessageEmbed()
        .setTitle(`Comandos de Kalion Ultimate`)
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .addField(
          `:underage: NSFW`,
          `Para ayuda adicional entra al: \n[Servidor de soporte](https://discord.gg/3RdZ9mD)`
        )
        .addField(":page_facing_up: Comandos:", "```nsfwconfig | r34 | ass | furgay | furbara | furfuck | furgayfuck | fursolo```")
        .setFooter(
          `Para ver informacion detallada de un comando usa ${await message.guild.getPrefix()}help (comando)`
        )
        .setColor("RANDOM");
        
        message.channel.send(embed2)
      }  else if(elc === `miner`){
        const embed2 = new Discord.MessageEmbed()

        .setTitle("Comandos de Kalion Ultimate")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .addField(
          ":pick: Mineria",
          "Para ayuda adicional entra al: \n[Servidor de soporte](https://discord.gg/3RdZ9mD)"
        )
        .addField(":page_facing_up: Comandos:", "```mine | minerales | minfo | backpack | sell```")
        .setFooter(
          `Para ver informacion detallada de un comando usa ${await message.guild.getPrefix()}help (comando)`
        )
        .setColor("RANDOM");
        
        message.channel.send(embed2)
      } else if(elc === `music`){
        const embed2 = new Discord.MessageEmbed()

        .setTitle("Comandos de Kalion Ultimate")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .addField(
          bot.emotes.music +" Musica ",
          "Para ayuda adicional entra al: \n[Servidor de soporte](https://discord.gg/3RdZ9mD)"
        )
        .addField(":page_facing_up: Comandos:", "```play | allfilters | clear-queue | filter | loop | now-playing | pause | queue | resume | shuffle | skip | stop | volume```")
        .setFooter(
          `Para ver informacion detallada de un comando usa ${await message.guild.getPrefix()}help (comando)`
        )
        .setColor("RANDOM");
        
        message.channel.send(embed2)
      } else if(elc === `fun`){
        const embed2 = new Discord.MessageEmbed()

        .setTitle("Comandos de Kalion Ultimate")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .addField(
          ":joy: Diversion ",
          "Para ayuda adicional entra al: \n[Servidor de soporte](https://discord.gg/3RdZ9mD)"
        )
        .addField(`:page_facing_up: Comandos Image:`, `\`\`\`batslap | beautilful | blancoynegro(byn) | bobross | circle | confusedstonks(cstonks) | doublestonks(dstonks) | eliminar | gay | lisapresentation(lpresentation) | notstonks(nstonks) | putin | rip | spank | stonks | thomas | trash | triggered | wanted\`\`\``)
        .addField(":page_facing_up: Comandos Otros:", "```xboxlogro | geometryfont | chiste | meme | 8ball | love | rps | bigtext | fancify | ascii | snipe | usersay```")
        .setFooter(
          `Para ver informacion detallada de un comando usa ${await message.guild.getPrefix()}help (comando)`
        )
        .setColor("RANDOM");
         
        message.channel.send(embed2)
      } else if(elc === `react`){
        const embed2 = new Discord.MessageEmbed()

        .setTitle("Comandos de Kalion Ultimate")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .addField(
          ":heart: Reacciones",
          "Para ayuda adicional entra al: \n[Servidor de soporte](https://discord.gg/3RdZ9mD)"
        )
        .addField(":page_facing_up: Comandos:", "```angry | dance | hug | punch | run```")
        .setFooter(
          `Para ver informacion detallada de un comando usa ${await message.guild.getPrefix()}help (comando)`
        )
        .setColor("RANDOM");
        
        message.channel.send(embed2)
      } else if(elc === `admin`){
        const embed2 = new Discord.MessageEmbed()

        .setTitle("Comandos de Kalion Ultimate")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .addField(
          ":hammer: Administrador ",
          "Para ayuda adicional entra al: \n[Servidor de soporte](https://discord.gg/3RdZ9mD)"
        )
        .addField(":page_facing_up: Comandos:", "```ban | unban | kick | warns | warn | delwarn | clearwarns | config | checkinvites | lockdown | cooldown ```")
        .setFooter(
          `Para ver informacion detallada de un comando usa ${await message.guild.getPrefix()}help (comando)`
        )
        .setColor("RANDOM");
        
        message.channel.send(embed2)
      } else if (elc === "util") {
        const embed = new Discord.MessageEmbed()
          .setTitle("Comandos de Kalion Ultimate")
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .addField(
            ":wrench: Utilidad",
            "Para ayuda adicional entra al: \n[Servidor de soporte](https://discord.gg/3RdZ9mD)"
          )
          .addField(`:page_facing_up: Comandos Bot:`, 
          `\`\`\`botinfo | botsuggest | bugreport | help | invite | ping | seeon | soporte | vote | servers\`\`\``)
          .addField(`:page_facing_up: Comandos DSC.GG:`, 
          `\`\`\`link-info | link-user-info | user-links\`\`\``)
          .addField(`:page_facing_up: Comandos Guilds:`, 
          `\`\`\`canales | emojis | members-status | userinfo | serverinfo\`\`\``)
          .addField(`:page_facing_up: Comandos Mod:`, 
          `\`\`\`clear | createrole | nickname | setnsfw | role\`\`\``)
          .addField(`:page_facing_up: Comandos General:`, 
          `\`\`\`kirby | avatar | calc | canvassay | djsdocs | discord-reputation | fortnite-store | fortnite-user | geometryfont | hex | jumbo | lyrics | morse | pokedex | qr | reverse | say | shortlink | steamuser | tagSearch | usersay | xboxlogro | youtube\`\`\``)
          .setFooter(
            "Para ver informacion detallada de un comando usa ${await message.guild.getPrefix()}help (comando)"
          )
          .setColor("RANDOM");
  
        message.channel.send(embed);
      } else if (args[0]){
        const searchCommand = bot.comandos.find(command => 
          command.help && command.help.name === args[0].toLowerCase()
        )
        if(!searchCommand) return send('No encontre el comando que solicitaste');
      
        if(searchCommand.nsfw)return message.channel.send('Necesitas estar en un canal nsfw para usar este comando!')

        let help = searchCommand.help

        let prefix = await message.guild.getPrefix()

        const e = new Discord.MessageEmbed()
        .setTitle(`Comando ${prefix}${help.name}`)
        .setDescription(`
        **Descripcion:** ${help.description}
        **Uso:** ${prefix}${help.usage}
        ${help.cooldown ? `**Cooldown:** ${help.cooldown}` : ''}
        ${help.aliases ? `**Alias:** ${help.aliases}` : ''}
        **Ejemplo:** ${prefix}${help.example}`)
        .setFooter("[] = Obligatorio, () = opcional | No debes incluir los signos al usar el comando!")
        .setColor("RED");

        return message.channel.send(e)
      } else {
    message.channel.send(e);
    }
  }
}
module.exports.help = {
  name: 'help',
  description: 'Un comando para saber los comandos xD',
  cooldown: [],
  alias: [],
  usage: 'help {comando/categoria}',
  example: 'help economy'
}
