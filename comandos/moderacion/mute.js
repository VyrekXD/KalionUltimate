const Discord = require('discord.js');
const { checkPerms } = require('../../util/Functions/checkPermissions')
const logsModel = require('../../database/models/logs')

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','MANAGE_ROLES'],
  guildOnly: true,
  run: async(client, message, args) => {

    if(!checkPerms(message.member, 'MANAGE_MESSAGES'))return message.channel.send(`Permisos insuficientes`) 
    
    let usuario = message.mentions.members.first() || message.guild.members.resolve(args[0])
    let razon = args[1] ? args.slice(1).join(' ') : 'No fue especificada'
    let role = message.guild.roles.cache.find(x => x.name === 'Muted')

    if(!message.guild.me.permissions.has('MANAGE_ROLES')) return message.channel.send('Necesito el permiso Gestionar roles')
    if(!usuario) return message.channel.send('No has mencionado a ningun usuario')
    if(usuario.id === message.author.id) return message.channel.send('No puedes mutearte a ti mismo')
    if(usuario.id === client.user.id) return message.channel.send('No puedes mutearme')
    if(message.guild.owner.id !== message.author.id && usuario.roles.highest.comparePositionTo(message.member.roles.highest) >= 0) return message.channel.send('No puedes mutear a ese usuario')
    if(role && role.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('No puedo dar el role Muted')
    if(role && usuario.roles.cache.has(role.id)) return message.channel.send('Ese usuario ya esta muteado')
    if(razon.length > 1024) return message.channel.send('La razon no puede exceder los 1024 caracteres')

    if(!role){ //Verificamos si el role existe y abrimos
      message.guild.roles.create({
      data: { name: 'Muted',
      color: 'BLACK',
      reason: 'Mute role'}
      })
      then(role => {
        message.guild.channels.cache.forEach(r => r.updateOverwrite(role.id, {
        SEND_MESSAGES: false
          })) 
        usuario.roles.add(role.id)
        
        })
        } else {
          usuario.roles.add(role.id)
          }
          const embed = new Discord.MessageEmbed()
          .setColor(`RANDOM`)
          .setDescription(`${usuario.tag} ha sido muteado por ${message.author.tag}`)
          .setAuthor(usuario.tag, usuario.displayAvatarURL())
          message.channel.send(embed)

          const e = new Discord.MessageEmbed()
          .setTitle('__**Usuario Muteado**__')
          .addField('Usuario', `<@${usuario.id}>`)
          .addField('Moderador', `<@${message.author.id}>`)
          .addField('Razon', razon)
          .setColor('RANDOM')

          let consulta = logsModel.findOne({servidor: message.guild.id})
          if(!consulta)return
          if(!consulta.memberMuted)return

          log = await consulta.canals
        
          client.channels.cache.get(log)
          let canal1 = client.channels.cache.get(log)
          canal1.send(e)
}
}