const Discord = require('discord.js');
const Canvas = require("canvas")

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: ['ssay'],
guildOnly: true,
run: async (bot, message, args, send) => {

    const miembro = message.mentions.members.first()
    if(!miembro) return message.channel.send(":x: | ¡Debes mencionar a alguien antes del mensaje!")
    const mensaje = args.slice(1).join(" ")
    if (!mensaje) return message.channel.send(":x: | ¡Debes escribir un mensaje!")
    
    const canvas = Canvas.createCanvas(400,69)//nice
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = "#36393f"
    ctx.fillRect(0,0,canvas.width, canvas.height)
    

    const x=11,y=13, radius=20
    ctx.save()
    ctx.beginPath()
    ctx.arc(x+radius, y+radius, radius, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()
    

    const url = miembro.user.displayAvatarURL({ format: 'png', dynamic: false, size: 1024})
    const image = await Canvas.loadImage(url)
    ctx.drawImage(image, x, y, radius * 2, radius *2)
    
    ctx.restore()

    ctx.lineWidth=.3
    ctx.font = "14px Sans Serif"
    ctx.fillStyle = miembro.roles.color.hexColor || '#000'
    ctx.strokeStyle = miembro.roles.color.hexColor || '#000'
    ctx.strokeText(miembro.nickname || miembro.user.username, 66, 27)
    ctx.fillText(miembro.nickname || miembro.user.username, 66, 27)
    

    let largo = ctx.measureText(miembro.nickname || miembro.user.username).width
    ctx.font = "11.2px Sans Serif"
    ctx.fillStyle= "#72767d"
    
    let hour = Math.floor(Math.random() * 12)
    let min  = Math.floor(Math.random() * 60)
    const t = ["AM","PM"]
    const tt= t[Math.floor(Math.random() * t.length)]
    
    hour = (hour < 10 ? "0" : "") + hour
    min = (min < 10 ? "0" : "") + min
    
    ctx.fillText(`Today at ${hour}:${min} ${tt}`, 66 + largo + 8,27)
    

    ctx.lineWidth=.1
    ctx.font= "14.5px Whitney"
    ctx.fillStyle = "#dcddde"
    ctx.strokeStyle = "#dcddde"
    let w = ctx.measureText(mensaje).width - Math.floor(ctx.measureText(mensaje).width*.08)
    ctx.strokeText(mensaje, 66, 50, w)
    ctx.fillText(mensaje, 66, 50, w)
    
    const attach = new Discord.MessageAttachment(canvas.toBuffer(),'isay.png')
    send(attach)
    }
}

module.exports.help = {
name: 'canvassay',
description: 'Has que diga algo como screenshot',
cooldown: [],
alias: ['ssay'],
usage: 'canvassay [usuario] [texto]',
example: 'canvassay @NoobLance Soy noob lance!'
}