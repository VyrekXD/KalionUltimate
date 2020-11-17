const Discord = require('discord.js');
const configModel = require('../database/models/guildConfig')
const moment = require('moment')

module.exports.run = async(bot, statcord, message) => {

      if(message.author.bot) return;
      
      let res = await message.guild.getConfig()
      let prefix = res.guildPrefix

      if(message.content.match(new RegExp(`^<@!?${bot.user.id}>( |)$`))) return message.channel.send(`Mi prefix es ${prefix} puedes hacer ${prefix}help para iniciar`)

      const array = ['Hola','hola','holi','Holi','Holiwis','holiwis','ola','Ola']

      if(array.includes(message.content))return message.react(`👋`)
      
      if(!message.content.startsWith(prefix)) return; 

      let bl = await message.author.getBlacklist()

      if(bl){
        const e = new Discord.MessageEmbed()
        .setTitle(`❌ Estas Blacklisteado!`)
        .setColor(`RED`)
        .setDescription(`Al estar blacklisteado no puedes usar al bot!\nSi deseas apelar tu blacklist entra a el [server](https://discord.gg/3RdZ9mD) de soporte`)
        .addField(`**Detalles**`, `
        - Moderator: ${bot.users.resolve(bl.devID).tag}
        - Razon: ${bl.reason}
        - Fecha: ${moment(bl.date).format('L')}`)
        return message.channel.send(e)
      }

      if(res.modConfig.onlyMod === true)return

      const command = args.shift().toLowerCase()

      let cmd = bot.comandos.get(command) || bot.comandos.find(c => c.aliases && c.aliases.includes(command))
      if(cmd){
        let send = (text) => message.channel.send(text)

        if(cmd.guildOnly){
          if(cmd.guildOnly === true && !message.guild)return send(`Este comando solo funciona en servidores!`)
        }
        if (!message.guild.me.permissionsIn(message.channel).has(cmd.permisos)) {
          return send(`No tengo alguno de estos permisos: \n\`${message.guild.me.permissionsIn(message.channel).missing(cmd.permisos)}\``)
        }
        
        if(cmd.nsfw){
          if(!message.channel.nsfw)return send('Necesitas estar en un canal nsfw para usar este comando!')
        }

        cmd.run(bot, message, args, send)

        let cmdname = cmd.help ? cmd.help.name : 'private'

        statcord.postCommand(cmdname, message.author.id)

      }
}