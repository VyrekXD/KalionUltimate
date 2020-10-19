const Discord = require('discord.js')
const warnModel = require('../../database/models/warns')
const { checkPerms } = require('../../util/Functions/checkPermissions')

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {

    
    if(!checkPerms(message.member, 'ADMINISTRATOR'))return message.channel.send(`Permisos insuficientes`)

    let servidorr = message.guild

    let usuario = message.mentions.members.first() || 
    message.guild.members.cache.get(args[0]);

    if(!usuario)return message.channel.send(`Menciona un usuario!`)

    let consulta = await warnModel.find({targetid: usuario.user.id, servidor: servidorr.id})

    if(consulta.length === 0)return message.channel.send(`El usuario no cuenta con ningun warn!`)

    message.channel.send("<a:loadingoogle:744334507242422302> Cargando.....").then(async m => {
        setTimeout(async () => {

        await warnModel.deleteMany({targetid: usuario.user.id})

         const e = new Discord.MessageEmbed()
        .setColor(`GREEN`)
        .setDescription(`Todos los warns para el usuario ${usuario.user.tag} han sido borrados satisfactoriamente`)

        m.edit('** **', e)
        }, 3000)
         })
    
    
    
}
}