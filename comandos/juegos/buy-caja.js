const Discord = require('discord.js');
const moneyModel = require('../../database/models/dinero')
const cajaModel = require('../../database/models/cajas')
const mineModel = require('../../database/models/mineria')

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    run: async(client, message, args) => {

    let usuario = message.author
    let servidor = message.guild;
    let DbServidor = await db.collection("dinero").findOne({servidor: servidor.id, usuario: usuario.id})
    let DbServidor1 = await db.collection("cajas").findOne({servidor: servidor.id, usuario: usuario.id})
    let DbServidor2 = await db.collection("mineria").findOne({servidor: servidor.id, usuario: usuario.id})
    
    let elec = args.slice(0).join(" ")

    if(!elec)return message.channel.send(`Necesitas elegir que quieres comprar!`)
    

}
}