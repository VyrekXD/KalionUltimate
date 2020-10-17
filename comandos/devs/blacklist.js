const Discord = require('discord.js');
const devModel = require('../../database/models/developer')
const blackModel = require('../../database/models/ublacklist')
const sblackModel = require('../../database/models/sblacklist')

module.exports.run = async(client, message, args) => {

    let consulta = await devModel.findOne({developer: message.author.id})

    if(!consulta)return message.channel.send(`Solo **Developers** pueden usar este comando!`)
    
    let elec = args[0]

    if(elec === 'server'){
        if(!args[1])return message.channel.send(`Ingresa la ID de el servidor!`)

        let consulta = await sblackModel.findOne({servidor: args[1]})

        if(consulta)return message.channel.send(`El servidor ya esta blacklisteado!`)

        let servidor = client.guilds.resolve(args[1])

        if(!servidor)return message.channel.send(`El servidor no ha sido encontrado`)

        let raz = args.slice(2).join(" ")

        if(!raz)raz = 'No hay una razon definida';
        
        const e1 = new Discord.MessageEmbed()
        .setColor(`GREEN`)
        .setTitle(`✅ Nuevo Servidor BlackListeado`)
        .setDescription(`Servidor: ${servidor.name}\nID: ${args[1]}\nRazon: ${raz}`)
        message.channel.send(e1)

        let nuevo = new sblackModel({servidor: servidor.id, razon: raz})
        nuevo.save()
    }else if(elec === 'usuario'){

        let usuario2 = message.mentions.users.first()

        if(!usuario2){
            return message.channel.send('Necesitas mencionar a alguien!')
        }
    
        let raz = args.slice(1).join(" ")
    
        if(!raz){
            raz = 'No hay una razon definida'
        }
    
        if(usuario2.id === consulta.developer){
            return message.channel.send(`No puedes poner en la blacklist a los developers!`)
        }
    
        let consulta2 = await blackModel.findOne({usuario: usuario2.id})
    
        if(consulta2){
           return message.channel.send(`El usuario ya esta en la blacklist!`)
        }
    
        const e = new Discord.MessageEmbed()
        .setColor(`GREEN`)
        .setTitle(`✅ Nuevo Usuario BlackListeado`)
        .setDescription(`Usuario: ${usuario2}\nID: ${usuario2.id}\nRazon: ${raz}`)
        message.channel.send(e)
        
        let nuevo = new blackModel({usuario: usuario2.id, razon: raz})
        nuevo.save()
    }else {
        return message.channel.send(`Debes de decir que quieres blacklistear ejemplo "k!blacklist (server/usuario) (id/mencion) (razon)"`)
    }
    }
