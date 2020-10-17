const Discord = require('discord.js');

module.exports = {
    aliases: ['rps'],
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    run: async(client, message, args) => {
        if(!args[0])return message.channel.send("Opciones: `piedra`, `papel` o `tijera`")

        let opciones = ["piedra", "papel", "tijera"]
        if(!opciones.includes(args[0].toLowerCase())) return message.channel.send("¡Opción incorrecta!")
        
        if(args[0] == 'piedra') {
          let random = ["¡Ganaste! Has elejido `piedra` y yo elegí `tijera`.", //win
                        "¡Gané!, Has elejido `piedra` y yo elegí `papel`.", //loser
                        "Empate. Has elejido `piedra` y yo elegí `piedra`."] //draw
          
          message.reply(` ${random[Math.floor(Math.random() * random.length)]}`)
        
         }
        
        if(args[0] == 'papel') {
          let random2 = ["¡Gané!. Has elejido `papel` y yo elegí `tijera`", //loser
                         "Empate. Has elejido: `papel` Y yo elegí `papel`.", //draw
                         "¡Ganaste!. Has elejido `papel` y yo elegí `piedra`."] //win
          
          message.reply(` ${random2[Math.floor(Math.random() * random2.length)]}`)
        
         }
        
        if(args[0] == 'tijera') {
          let random3 = ["Empate. Has elejido: `tijera` y yo elegí `tijera`.", //draw
                         "¡Ganaste!. Has elejido `tijera` y yo elegí `papel`.", //win
                         "¡Gané!. Has elejido `tijera` y yo elegí `piedra`."] //loser
          
          message.reply(` ${random3[Math.floor(Math.random() * random3.length)]}`)
         }
    }
}

module.exports.help = {
name: 'piedrapapeltijeras',
description: 'Piedra papel y tijeras que mas quieres XD',
cooldown: [],
alias: [],
usage: 'rps [eleccion]',
example: 'rps piedra'
}