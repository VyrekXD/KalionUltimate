const Discord = require('discord.js');
const devModel = require('../../database/models/developers')
const blackModel = require('../../database/models/blacklist')

module.exports = {
    aliases: ['bl'],
    run: async(bot, message, args, send) => {

        let consulta = await devModel.findOne({userID: message.author.id})
    
        if(!consulta)return message.channel.send(`Solo **Developers** pueden usar este comando!`)
        
        if(!args[0])return send(`Debes de poner una accion: [rm/add]`)

        if(args[0].toLowerCase() === 'rm' || args[0].toLowerCase() === 'remove' || args[0].toLowerCase() === 'rem'){

            let user = message.mentions.users.first() || bot.users.resolve(args[1])

            if(!user)return send(`Tienes que mencionar a alguien`)
        
            let fibl = await blackModel.findOne({userID: user.id})
        
            if(!fibl)return send(`Ese usuario no esta en la blacklist`)
        
            const e = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Unblacklist')
            .addField(`**Usuario**`, `${user.tag}\n${user.id}`)
            .addField(`**Developer**`, `${message.author.tag}\n${message.author.id}`)
            
            send(e)
            bot.channels.resolve('773946739144654889').send(e)

            await user.setBlacklist('rm').catch(err => {
                send(`Ocurrio un error eliminando el documento: `)
                return send(err, {code: 'js'})
            })

        } else if(args[0].toLowerCase() === 'add'){
            let user = message.mentions.users.first() || bot.users.resolve(args[1])
    
            if(!user)return message.channel.send('Necesitas mencionar a alguien!')
        
            let raz = args.slice(2).join(" ")
        
            if(!raz)return send('Necesitas poner una razon >:(')
            
            let devcheck = await devModel.findOne({userID: user.id})
            if(devcheck)return send(`No puedes poner en la blacklist a los developers!`)
        
            let cons = await blackModel.findOne({userID: user.id})
        
            if(cons)return message.channel.send(`El usuario ya esta en la blacklist!`)
        
            const e = new Discord.MessageEmbed()
            .setColor(`GREEN`)
            .setTitle(`✅ Nuevo Usuario BlackListeado`)
            .addField(`**Usuario**`, `${user.tag}\n${user.id}`)
            .addField(`**Developer**`, `${message.author.tag}\n${message.author.id}`)
            .addField(`**Razon**`, raz)
    
            send(e)

            await user.setBlacklist('add', raz, message.author.id).catch(err => {
                send(`Ocurrio un error añadiendo el documento: `)
                return send(err, {code: 'js'})
            })

            bot.channels.resolve('773946739144654889').send(e)
            } else {
                return send(`Escribe una opcion correcta! [rm/add]`)
            }
        }
}

module.exports.help = {
    name: 'blacklist',
    aliases: ['bl'],
}