const Discord = require('discord.js');
const fetch = require("node-fetch")

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    run: async(client, message, args) => {
        
    if(!args[0])return message.channel.send(`Necesitas ingresar un codigo hex valido!`)

    const res = await fetch(`https://api.alexflipnote.dev/color/${args[0]}`)

    if(!res.ok) return message.channel.send("Ingresa un hex correcto. Recuerda no usar `#`")

    const json = await res.json()

    const e = new Discord.MessageEmbed()
    .setTitle(`**${json.name}**`)
    .setColor(json.hex)
    .setImage(json.image_gradient)
    .setThumbnail(json.image)
    .setDescription(`Valor Hex: **${json.hex}**\nValor RGB: **${json.rgb}**\nValor Entero: **${json.int}**`)
    .setFooter(`Brillo: ${json.brightness}%`)

    message.channel.send(e)

}
}