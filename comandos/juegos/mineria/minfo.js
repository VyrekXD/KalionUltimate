const Discord = require('discord.js');

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    guildOnly: true,
    run: async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setThumbnail(`https://cdn.discordapp.com/attachments/721128332959285258/730573324958171208/minero.png`)
    .setColor('BLUE')
    .setTitle(`Informacion Sobre El Sistema De Mineria`)
    .setDescription('Hola! '+ message.author.username +', Este es un sistema de mineria en el cual puedes ganar dinero vendiendo minerales que te encuentres en el mundo puedes encontrarme diferentes tipos de minerales para saber cuales minerales te puedes encontrar usa `${await message.guild.getPrefix()}minerales`. Para poder hacer paracer esto a lo mas parecido a la vida real tuve que investigar mucho sobre minerales etc')
    .addField(`Como puedo comenzar?`, `Para poder comenzar usa \`${await message.guild.getPrefix()}mine\` y para vender tus minerales puedes usar \`${await message.guild.getPrefix()}sell\` y para ver los minerales que tienes puedes usar \`${await message.guild.getPrefix()}backpack\``)
    .setFooter(`Usa ${await message.guild.getPrefix()}help para ver mas informacion sobre el Sistema De Mineria`)
    message.channel.send(embed)
}
}