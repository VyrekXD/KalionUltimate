const Discord = require('discord.js')
const warnModel = require('../../database/models/warns')

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    run: async(client, message, args) => {

    if(message.author.id !== message.guild.ownerID)return message.channel.send('Solo el owner de el server puede borrar todos los warns de el server!')

    let servidorr = message.guild

    let consulta = await warnModel.find({servidor: servidorr.id})

    if(consulta.length === 0)return message.channel.send(`No hay warns en el server!`)

    message.channel.send("<a:loadingoogle:744334507242422302> Cargando.....").then(async m => {
        setTimeout(async () => {

        await warnModel.deleteMany({servidor: servidorr.id})

         const e = new Discord.MessageEmbed()
        .setColor(`GREEN`)
        .setDescription(`Todos los warns para el usuario ${s} han sido borrados satisfactoriamente`)

        m.edit('** **', e)
        }, 3000)
         })
    
    
    
}
}