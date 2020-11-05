const Discord = require('discord.js');
const devModel = require('../../database/models/developers')
const blackModel = require('../../database/models/blacklist')

module.exports = {
    aliases: ['bl'],
    run: async(bot, message, args, send) => {

        let consulta = await devModel.findOne({userID: message.author.id})
    
        if(!consulta)return message.channel.send(`Solo **Developers** pueden usar este comando!`)
        
    
            let user = message.mentions.users.first() || bot.users.resolve(args[0])
    
            if(!user)return message.channel.send('Necesitas mencionar a alguien!')
        
            let raz = args.slice(1).join(" ")
        
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
            
            let nuevo = new blackModel({userID: user.id, devID: message.author.id, reason: raz, date: Date.now()})
            nuevo.save()
            bot.channels.resolve('773946739144654889').send(e)
        }
}
