const Discord = require('discord.js');
const devModel = require('../../database/models/developers')
const blackModel = require('../../database/models/ublacklist')
const sblackModel = require('../../database/models/sblacklist')

module.exports = {
guildOnly: true,
run: async(client, message, args) => {

    let consulta = await devModel.findOne({userID: message.author.id})

    if(!consulta)return message.channel.send(`Solo **Developers** pueden usar este comando!`)
    
    let elec = args[0]

    if(elec === 'server'){
        if(!args[1])return message.channel.send(`Ingresa la ID de el servidor!`)

        let consulta = await sblackModel.findOne({servidor: args[1]})

        if(!consulta)return message.channel.send(`El servidor no esta blacklisteado!`)

        let servidor = client.guilds.resolve(args[1])

        if(!servidor)return message.channel.send(`El servidor no ha sido encontrado`)
        
        const e1 = new Discord.MessageEmbed()
        .setColor(`GREEN`)
        .setTitle(`✅ Nuevo Servidor UnBlackListeado`)
        .setDescription(`Servidor: ${servidor.name}\nID: ${args[1]}`)
        message.channel.send(e1)

        await sblackModel.deleteOne({servidor: message.guild.id})

    }else if(elec === 'usuario'){

        let usuario2 = message.mentions.users.first()

        if(!usuario2){
            return message.channel.send('Necesitas mencionar a alguien!')
        }
    
        if(usuario2.id === consulta.developer){
            return message.channel.send(`No puedes poner en la blacklist a los developers!`)
        }
    
        let consulta2 = await blackModel.findOne({usuario: usuario2.id})
    
        if(!consulta2){
           return message.channel.send(`El usuario no esta blacklisteado!`)
        }
    
        const e = new Discord.MessageEmbed()
        .setColor(`GREEN`)
        .setTitle(`✅ Nuevo Usuario UnBlackListeado`)
        .setDescription(`Usuario: ${usuario2}\nID: ${usuario2.id}`)
        message.channel.send(e)
        
        await sblackModel.deleteOne({servidor: message.guild.id})

    }else {
        return message.channel.send(`Debes de decir que quieres unblacklistear ejemplo "k!unblacklist (server/usuario) (id/mencion)"`)
    }
}
}