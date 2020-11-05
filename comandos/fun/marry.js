const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const marModel = require('../../database/models/marry')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
guildOnly: true,
run: async (bot, message, args, send) => {
 
    let mem = message.mentions.members.first() || message.guild.members.resolve(args[0])

    if(!mem)return send(`Necesitas mencionar a alguien!`)
    if(mem.user.bot)return send(`No te gustara casarte con un bot... :flushed:`)

    let find1 = await marModel.findOne({userID: mem.id})
    let find2 = await marModel.findOne({user2ID: mem.id})

    if(find1 || find2)return send(`Ese usuario ya esta casado con alguien!`)

    let mssg = await send(`${mem.user.toString()}, ${message.author} te ha pedido matrimonio! Escribe \`acepto\` o \`no\` para elegir!`)

    let filter = (m) => m.author.id === mem.user.id && m.content.toLowerCase() === 'acepto' || m.content.toLowerCase() === 'no';
    let collector = message.channel.createMessageCollector(filter, { idle: 120000 });

    collector.on('collect', async(msg) => {

        if(msg.content.toLowerCase() === 'acepto'){

            mssg.delete()

            send(`${message.author}, ${mem.user.toString()} ahora estan casados!`)

            let nue = new marModel()
            nue.userID = message.author.id
            nue.user2ID = mem.user.id
            nue.date = Date.now()
            nue.save()

            collector.stop('si')
        }else {

            msg.delete()

            send(`${message.author}, ${mem.user.toString()} no quiso casarse contigo lo siento...`)

            collector.stop('si')
        }
    })

    collector.on('end', (reason, collected) => {
        if(reason === 'si')return;
        else return send(`Se acabo el tiempo! ${mem.user.toString()} no respondio lo siento..`)
    })

   }
}

module.exports.help = {
name: 'marry',
description: 'Casate con alguien!',
cooldown: [],
alias: [],
usage: 'marry [user/id]',
example: 'marry @Kalion'
}