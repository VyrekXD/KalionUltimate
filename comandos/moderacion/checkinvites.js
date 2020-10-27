const Discord = require('discord.js');

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {

    let usuarios = message.guild.members.cache.filter(x => x.presence.activities.find(x => x.type === 'CUSTOM_STATUS') && x.presence.activities.find(x => x.type === 'CUSTOM_STATUS').state && x.presence.activities.find(x => x.type === 'CUSTOM_STATUS').state.includes('https://discord.gg')).map(x => x.displayName)

   message.channel.send(`Usuarios con invites en el estado: ${usuarios.join('\n')}`)

    
    message.channel.send(`Puedes poner una configuracion de el servidor en kalion para automaticamente warnearlos o banearlos o kickearlos en cuanto se unan`)
    

}
}