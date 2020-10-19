const Discord = require('discord.js');
const client = new Discord.Client();
const ms = require("ms")

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    run: async(client, message, args) => {

    let objeto = args.slice(2).join(" ")
    let winners = args[1]
    let tiempo = args[0]

    if(!tiempo)return message.channel.send('<a:error:721475630688108554> Debes de incluir el tiempo la cantidad de ganadores y lo que quieres rifar\nEjemplo: `k!gstart 20m 2w Unas papitas uwu`')
    if(!winners)return message.channel.send('<a:error:721475630688108554> Debes de incluir el tiempo la cantidad de ganadores y lo que quieres rifar\nEjemplo: `k!gstart 20m 2w Unas papitas uwu`')
    if(!objeto)return message.channel.send('<a:error:721475630688108554> Debes de incluir el tiempo la cantidad de ganadores y lo que quieres rifar\nEjemplo: `k!gstart 20m 2w Unas papitas uwu`')

    if(!tiempo.match(/\d+[s|d|m|h]/))return message.channel.send('<a:error:721475630688108554> Debes de incluir el tiempo la cantidad de ganadores y lo que quieres rifar\nEjemplo: `k!gstart 20m 2w Unas papitas uwu`')
    if(!winners.match(/\d+[w]/))return message.channel.send('<a:error:721475630688108554> Debes de incluir el tiempo la cantidad de ganadores y lo que quieres rifar\nEjemplo: `k!gstart 20m 2w Unas papitas uwu`')
    
    if(ms(tiempo) <= 5 * 1000 * 60)return message.channel.send("El tiempo es muy corto min: 5m")
    if(ms(tiempo) >= 30 * 1000 * 60 * 24)return message.channel.send("El tiempo es muy largo max: 30d")
    if(parseInt(winners) < 0 )return message.channel.send(`No puedes elegir esos ganadores`)
    if(objeto.length >= 256) return message.channel.send("El titulo es muy largo")
    

    let titotal = Date.now() + ms(tiempo)
    const embed = new Discord.MessageEmbed()
    .setTitle(objeto)
    .setDescription(`Reacciona a :tada: para participar\n**Tiempo: **${tiempo} \nCreador de el giveaway: ${message.author}`)
    .setColor(`RED`)
    .setFooter(`${parseInt(winners)} ganadores | Termina `)
    .setTimestamp(titotal)

message.channel.send(embed).then(msg => { // Enviamos el mensaje al cual se alojara el sorteo.

    msg.react("🎉") 

    
    const filter = (reaction, user) => reaction.emoji.name == '🎉' && user.id !== client.user.id; 
    
    const collector = msg.createReactionCollector(filter, {time: ms(tiempo)}); 
    
    var array = [] 
    
    collector.on("collect", r => {
    array.push(r.users.cache.last().id); 
    db.collection("guildsgiveaways").updateOne({servidor: servidor.id}, {$set: {gente: array}})
    })
    db.collection("guildsgiveaways").insertOne(
        {
        servidor: servidor.id,
        gente: array,
        numwinners: winners,
        time: tiempo,
        creador: message.author,
        giveaway: objeto,
        mensajeid: msg.id,
        canalid: msg.channel.id
        })
    let w2 = parseInt(winners)
    collector.on("end", () => {
        
        if(w2 > array.length){
            w2 = array.length
        }
    const winner = array[Math.floor(Math.random() * w2)] 

    const embed1 = new Discord.MessageEmbed()
    .setTitle(objeto)
    .setDescription(`Ganador: <@${winner}>\nCreador de el giveaway: <@${message.author.username}>`)
    .setFooter(`${parseInt(winners)} ganadores | Terminada `)
    .setColor(`BLUE`)
    .setTimestamp(titotal)
    setTimeout(() => {
        msg.edit({embed: embed1})
      }, ms(tiempo))
    message.channel.send(`Felicidades <@${winner}>! Ganaste en el giveaway: **${objeto}**!\nhttps://discordapp.com/channels/${servidor.id}/${msg.channel.id}/${msg.id}`) 
    })
    
    })
    
}
}