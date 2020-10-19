const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setTitle(`Minerales de el Sistema de Minar`)
    .setColor('8aa810')
    .setDescription(`Hola soy Vyrek y para poder sacar informacion de cada mineral tambien su rareza detalles etc tuve que leer jaja, si leer, lei cosas para poder hacer lo mas realista el juego`)
    .addField(`**Minerales Comunes:**`, `<:piedra:741084392696446976> Piedra: Un "mineral" que abunda en el planeta tierra **Valor:** 1 x 1\n<:carbon:741084392444919980> Carbon: Un mineral con el cual se pueden hacer muchas cosas ya que el estudio que le han dado a este mineral es increible **Valor:** 2 x 1`)
    .addField(`**Minerales Raros:**`, `<:ironingot:741084392927002755> Hierro: El hierro es un mineral comun se podria decir en la tierra ya que es lo que abunda en este mundo **Valor:** 5 x 1\n<:diamante:741084392667217950> Diamante: Unas de las piedras preciosas mas caras **Valor:** 10 x 1\n<:esmeralda:741084391983415398> Esmeralda: Una piedra preciosa mas cara que lo que es el diamante **Valor:** 15 x 1`)
    .addField(`**Minerales Epicos:**`, `<:zafiro:741084392449114183> Zafiro: El zafiro es una piedra muy valiosa valorada por su color y brillanteza **Valor:** 22 x 1\n<:ruby:741084392490795029> Ruby: El ruby es la piedra mas cara en el mundo pero no en este juego **Valor:** 30 x 1`)
    .addField(`**Minerales Legendarios:**`, `<:kalonsita:741084392310571109> Kalonsita: Es el mineral de el juego B) **Valor:** 100 x 1`)

    message.channel.send(embed)
}
}