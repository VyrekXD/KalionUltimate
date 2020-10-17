const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES'],
    run: async(client, message, args) => {
        
    let mensaje = args.slice(0).join(' ')

    let reversa = mensaje.split('').reverse()
    message.channel.send(reversa)
}
}