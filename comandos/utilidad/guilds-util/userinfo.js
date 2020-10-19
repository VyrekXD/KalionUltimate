const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  guildOnly: true,
  run: async(client, message, args) => {
    
let mentioned = message.mentions.members.first() ||
      message.guild.members.cache.find(m => m.nickname === args[0]) ||
      message.guild.members.cache.find(m => m.user.tag === args[0]) ||
      message.guild.members.cache.find(m => m.user.username === args[0]);
let usuario = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
const member = message.guild.member(usuario)
  let status = {
    "online":"Conectado | <a:online:724001791712428113>",
    "idle":"Ausente | <a:ausente:724001759827066910>",
    "dnd":"No molestar | <a:dnd:724001811337445410>",
    "offline":"Desconectado/Invisible | <a:offline:724001911770054728>",
  }
  //Object.keys(message.author.presence.clientStatus)
  const embed = new Discord.MessageEmbed()
    .setThumbnail(usuario.displayAvatarURL({ format: "png", size: 512, dynamic: true }))
    .setAuthor('Info de ' + usuario.username+'#'+usuario.discriminator, usuario.avatarURL())
    .setColor("RANDOM")  
    .addField('Nombre', usuario.username, true)
    .addField('ID', usuario.id, true)
    .addField('Estado', status[usuario.presence.status], true)
    .addField("¿Es un BOT?", usuario.bot ? 'Si, es un bot' : 'No, no es un bot' )
    .addField('Jugando a:', usuario.game === null ? `Nada` : usuario.presence.game, true)
    .addField("Avatar URL", `[Avatar link](${usuario.displayAvatarURL({ format: "png", size: 1024})})`)
    .addField('Apodo', usuario.nickname != null ? member.nickname : "Sin apodo", true)
    .addField('Cuenta Creada', usuario.createdAt.toLocaleDateString(), true)
    .addField('Fecha de Ingreso', member.joinedAt.toLocaleDateString(), true)
    .addField('Roles', member.roles.cache.map(roles => roles).join(', ').replace(",@everyone", " "), true)//client.guilds.cache.map
    .setFooter("Solicitado por "+message.author.username+"", message.author.avatarURL)
    .addField('Permisos: ', '```'+ member.permissions.toArray().map(p => p).join(', ') + '```')
        if(message.guild.owner.id === member.id){
           
       embed.addField('Permisos especiales', "Server Owner")
       
          return message.channel.send(embed);
       }
        if(member.hasPermission('ADMINISTRATOR')){
           
       embed.addField('Permisos especiales', "Administrador")
        
        return message.channel.send(embed);
       }
    if(member.hasPermission('MANAGE_GUILD')){
           
       embed.addField('Permisos especiales', "Manejar el Servidor")
        
        return message.channel.send(embed);
       }
  message.channel.send(embed);
}
}