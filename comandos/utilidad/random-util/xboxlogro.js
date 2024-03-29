const Discord = require('discord.js');

module.exports = {
    aliases: ['xfonts'],
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {
        
        let elec1 = args[0]
        let elec2 = args[1]
        let elec3 = args.slice(2).join("+")
        let array = ['estilonotif','estilosincro','estilologro','estilosat','estilofallo','estiloone','oneverde','oneazul','onerojo','oneamarillo','oneverdeosc','onerosa']
        let prefix = await message.guild.getPrefix()

        if(!elec1){
            const attach = new Discord.MessageAttachment(`https://cdn.discordapp.com/attachments/721128332959285258/733094048918667274/Screenshot_2.png`)
            const atacch2 = new Discord.MessageAttachment(`https://cdn.discordapp.com/attachments/721128332959285258/733094080484999258/Screenshot_3.png`)
            const embed = new Discord.MessageEmbed()
            .setTitle(`<a:error:721475630688108554> Error de sintaxis`)
            .setDescription(`Puedes elegir entre todos estos estilos todos son gifs`)
            .addField(`Estilos xbox360 :`, `Estilo notificacion: \`${prefix}xboxfonts estilonotif\`\nEstilo Sincronismo: \`${prefix}xboxfonts estilosincro\`\nEstilo Logro: \`${prefix}xboxfonts estilologro\`\nEstilo SAT: \`${prefix}xboxfonts estilosat\`\nEstilo Fallo \`${prefix}xboxfonts estilofallo\``)
            .addField(`Estlos xbox One:`, `Estilo One: \`${prefix}xboxfonts estiloone\`\nEstilo One verde: \`${prefix}xboxfonts oneverde\`\nEstilo One Azul: \`${prefix}xboxfonts oneazul\`\nEstilo One Rojo: \`${prefix}xboxfonts onerojo\`\nEstilo One Amarillo: \`${prefix}xboxfonts oneamarillo\`\nEstilo One Verde Oscuro: \`${prefix}xboxfonts oneverdeosc\`\nEstilo One Rosa: \`${prefix}xboxfonts onerosa\``)
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
            .addField(`Estilos xbox360 :`, 'Estilo notificacion: `${prefix}xboxfonts estilonotif`\nEstilo Sincronismo: `${prefix}xboxfonts estilosincro`\nEstilo Logro: `${prefix}xboxfonts estilologro`\nEstilo SAT: `${prefix}xboxfonts estilosat`\nEstilo Fallo `${prefix}xboxfonts estilofallo`')
            .addField(`Estlos xbox One:`, 'Estilo One: `${prefix}xboxfonts estiloone`\nEstilo One verde: `${prefix}xboxfonts oneverde`\nEstilo One Azul: `${prefix}xboxfonts oneazul`\nEstilo One Rojo: `${prefix}xboxfonts onerojo`\nEstilo One Amarillo: `${prefix}xboxfonts oneamarillo`\nEstilo One Verde Oscuro: `${prefix}xboxfonts oneverdeosc`\nEstilo One Rosa: `${prefix}xboxfonts onerosa`')
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