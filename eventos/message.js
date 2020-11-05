const Discord = require('discord.js');
const configModel = require('../database/models/guildConfig')
const blackModel = require('../database/models/blacklist')
const moment = require('moment')

module.exports.run = async(bot, statcord, message) => {
      if (!message.guild) return;

      let server = message.guild

      if(message.author.bot) return;
      
      let res = await configModel.findOne({guildID: server.id})

      if(!res){
        let nuevo = new configModel({guildID: server.id})
        await nuevo.save()
        res = await configModel.findOne({guildID: server.id})
      }
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
        - Moderator: ${bot.users.resolve(blackusuario.devID).tag}
        - Razon: ${blackusuario.reason}
        - Fecha: ${moment(blackusuario.date)}`)
        return message.channel.send(e)
      }

      if(res.modConfig.onlyMod === true)return

      const args = message.content.slice(prefix.length).trim().split(/ +/g);  
      const command = args.shift().toLowerCase()

      let cmd = bot.comandos.get(command) || bot.comandos.find(c => c.aliases && c.aliases.includes(command))
      if(cmd){
        if (!message.guild.me.permissionsIn(message.channel).has(cmd.permisos)) {
          return message.channel.send(`No tengo alguno de estos permisos: \n\`${message.guild.me.permissionsIn(message.channel).missing(cmd.permisos)}\``)
        }
        
        if(cmd.nsfw){
          if(!message.channel.nsfw)return message.channel.send('Necesitas estar en un canal nsfw para usar este comando!')
        }

        let send = (text) => message.channel.send(text)

        cmd.run(bot, message, args, send)

        let cmdname = cmd.help ? cmd.help.name : 'private'

        //statcord.postCommand(cmdname, message.author.id)

      }
}