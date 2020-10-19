const Discord = require('discord.js');
const fetch = require("node-fetch")

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {

    
    if(!args[0])return message.channel.send(`Necesitas ingresar un usuario`)

    const res = await fetch(`https://api.alexflipnote.dev/steam/user/${args[0]}`)

    if(!res.ok) return message.channel.send("No se ha encontrado el usuario")

    const json = await res.json()

    let ob = {
        false:'No',
        true:'Si'
    }
    let ob1 = {
        
    }

    const e = new Discord.MessageEmbed()
    .setAuthor(json.profile.username, json.avatars.avatar)
    .setDescription(json.profile.summary)
    .setFooter(`Nombre real: ${json.profile.realname}`)
    .addField(`Estado`, json.profile.state, true)
    .addField(`Privacidad`, json.profile.privacy, true)
    .addField(`Localizacion`, json.profile.location, true)
    .addField(`Usuario URL`, `[Url De El Usuario](${json.profile.url})`, true)
    .addField(`Cuenta Baneada En Vac?`, ob[json.profile.vacbanned], true)
    .addField(`Creacion De Cuenta`, json.profile.timecreated, true)
    if(json.profile.background){
        e.setThumbnail(json.profile.background)
    }
    
    message.channel.send(e)
}
}