const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    aliases: ['xfonts'],
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {
        
        let elec1 = args[0]
        let elec2 = args[1]
        let elec3 = args.slice(2).join("+")
        let array = ['estilonotif','estilosincro','estilologro','estilosat','estilofallo','estiloone','oneverde','oneazul','onerojo','oneamarillo','oneverdeosc','onerosa']

        if(!elec1){
            const attach = new Discord.MessageAttachment(`https://cdn.discordapp.com/attachments/721128332959285258/733094048918667274/Screenshot_2.png`)
            const atacch2 = new Discord.MessageAttachment(`https://cdn.discordapp.com/attachments/721128332959285258/733094080484999258/Screenshot_3.png`)
            const embed = new Discord.MessageEmbed()
            .setTitle(`<a:error:721475630688108554> Error de sintaxis`)
            .setDescription(`Puedes elegir entre todos estos estilos todos son gifs`)
            .addField(`Estilos xbox360 :`, 'Estilo notificacion: `k!xboxfonts estilonotif`\nEstilo Sincronismo: `k!xboxfonts estilosincro`\nEstilo Logro: `k!xboxfonts estilologro`\nEstilo SAT: `k!xboxfonts estilosat`\nEstilo Fallo `k!xboxfonts estilofallo`')
            .addField(`Estlos xbox One:`, 'Estilo One: `k!xboxfonts estiloone`\nEstilo One verde: `k!xboxfonts oneverde`\nEstilo One Azul: `k!xboxfonts oneazul`\nEstilo One Rojo: `k!xboxfonts onerojo`\nEstilo One Amarillo: `k!xboxfonts oneamarillo`\nEstilo One Verde Oscuro: `k!xboxfonts oneverdeosc`\nEstilo One Rosa: `k!xboxfonts onerosa`')
            .setColor(`RED`)

            message.channel.send(embed)
            message.channel.send(attach)
            message.channel.send(atacch2)
            return
        }
        if(!elec2){
            const embed = new Discord.MessageEmbed()
            .setTitle(`<a:error:721475630688108554> Error de sintaxis`)
            .setDescription(`Debes de elegir las monedas que dara el logro max:10000`)
            .setColor(`RED`)
            return message.channel.send(embed)
        }
        if(!elec3){
            const embed = new Discord.MessageEmbed()
            .setTitle(`<a:error:721475630688108554> Error de sintaxis`)
            .setDescription(`Debes de decir la descripcion de el logro max:50 caracteres`)
            .setColor(`RED`)
            return message.channel.send(embed)
        }
        if(!array.includes(elec1)){
            const attach = new Discord.MessageAttachment(`https://cdn.discordapp.com/attachments/721128332959285258/733094048918667274/Screenshot_2.png`)
            const atacch2 = new Discord.MessageAttachment(`https://cdn.discordapp.com/attachments/721128332959285258/733094080484999258/Screenshot_3.png`)
            const embed = new Discord.MessageEmbed()
            .setTitle(`<a:error:721475630688108554> Error de sintaxis`)
            .setDescription(`Puedes elegir entre todos estos estilos todos son gifs`)
            .addField(`Estilos xbox360 :`, 'Estilo notificacion: `k!xboxfonts estilonotif`\nEstilo Sincronismo: `k!xboxfonts estilosincro`\nEstilo Logro: `k!xboxfonts estilologro`\nEstilo SAT: `k!xboxfonts estilosat`\nEstilo Fallo `k!xboxfonts estilofallo`')
            .addField(`Estlos xbox One:`, 'Estilo One: `k!xboxfonts estiloone`\nEstilo One verde: `k!xboxfonts oneverde`\nEstilo One Azul: `k!xboxfonts oneazul`\nEstilo One Rojo: `k!xboxfonts onerojo`\nEstilo One Amarillo: `k!xboxfonts oneamarillo`\nEstilo One Verde Oscuro: `k!xboxfonts oneverdeosc`\nEstilo One Rosa: `k!xboxfonts onerosa`')
            .setColor(`RED`)

            message.channel.send(embed)
            message.channel.send(attach)
            message.channel.send(atacch2)
            return
        }
        if(elec2 >= 10001){
            const embed = new Discord.MessageEmbed()
            .setTitle(`<a:error:721475630688108554> Error de sintaxis`)
            .setDescription(`Las monedas de el logro no deben ser mayores a 10000 de cantidad!`)
            .setColor(`RED`)
            return message.channel.send(embed)
        }
        if(elec3.length >= 50){
            const embed = new Discord.MessageEmbed()
            .setTitle(`<a:error:721475630688108554> Error de sintaxis`)
            .setDescription(`La descripcion de el logro no debe ser mayor a 50 caracteres!`)
            .setColor(`RED`)
            return message.channel.send(embed)
        }
        const atacch = new Discord.MessageAttachment(`https://www.logrosxbox.com/logrodesbloqueado/${elec1}/${elec2}/${elec3}.gif`, 'font.gif')
        message.channel.send(`Aqui tienes tu logro!`)
        message.channel.send(atacch)
    }
}