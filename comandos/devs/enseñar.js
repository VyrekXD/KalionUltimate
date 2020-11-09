const Discord = require('discord.js');
const devModel = require('../../database/models/developers')
const chatbot = require("espchatbotapi")

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
run: async (bot, message, args) => {

    let consulta = await devModel.findOne({userID: message.author.id})

    if(!consulta){
        return message.channel.send(`Solo **Developers** pueden usar este comando!`)
    }

    let pregunta;
    let respuesta1;

    const e = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`Escribe la pregunta!`)

    let mensaje = await message.channel.send(e)
    
    let filter = (msg) => message.author.id == msg.author.id && msg.content;
    let colector = message.channel.createMessageCollector(filter, {time: 60000, max: 1})

    colector.on('collect', async message => {

        pregunta = message.content
        message.delete()
        const e1 = new Discord.MessageEmbed()
        .addField(`**Pregunta:**`, pregunta)
        .setDescription(`Escribe la respuesta!`)
        .setColor('RANDOM')

        mensaje.edit(e1)

        let filter1 = (msg) => message.author.id == msg.author.id && msg.content;
        let colector1 = message.channel.createMessageCollector(filter1, {time: 60000, max: 1})

        colector1.on('collect', async message => {

            respuesta1 = message.content
            message.delete()
            const e2 = new Discord.MessageEmbed()
            .addField(`**Pregunta:**`, pregunta)
            .addField(`**Respuesta:**`, respuesta1)
            .setColor('RANDOM')
    
            mensaje.edit(e2)

            chatbot.enseñar(pregunta, respuesta1).then(respuesta => {

                const e3 = new Discord.MessageEmbed()
                .setDescription(respuesta)
                .setColor('RANDOM')

                mensaje.channel.send(e3)
              })
        })
    })
}
}

module.exports.help = {
    name: 'enseñar',
    aliases: [],
}