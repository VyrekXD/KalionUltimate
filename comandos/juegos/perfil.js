const Discord = require('discord.js');
const moneyModel = require('../../database/models/dinero')
const mineriaModel = require('../../database/models/mineria')


module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
  guildOnly: true,
  run: async(client, message, args) => {
    let usuario = message.mentions.users.first()

    if(!usuario)usuario = message.author
    
    let consulta1 = await moneyModel.findOne({servidor: servidor.id, usuario: usuario.id})
    let consulta2 = await mineriaModel.findOne({servidor: servidor.id, usuario: usuario.id})

    if(!consulta1){
      db.collection("dinero").insertOne(
        {
        servidor: servidor.id,
        usuario: usuario.id,
        dinero: 0,
        banco: 0,
        dinerotot: 0
        })
      }
      if(!consulta2){
        db.collection("mineria").insertOne(
            {
            servidor: servidor.id,
            usuario: usuario.id,
            piedra: 0,
            carbon: 0,
            hierro: 0,
            diamante: 0,
            esmeralda: 0,
            zafiro: 0,
            ruby: 0,
            kalonsita: 0
            })
    }

        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle(`Perfil de ${usuario.tag}`)
        .setColor(`RED`)
        .setDescription(`Cantidad De Kalonsita:`, `<:cristal:732014394409615360> ${consulta2.kalonsita}`)
        .addField(`Dinero`, `**Bolso:** :dollar: ${consulta1.dinero}\n**Banco:** :dollar: ${consulta1.banco}\n**Dinero Total:** :dollar: ${consulta1.dinerotot}`)
        message.channel.send(embed)
}
}