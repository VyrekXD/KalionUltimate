const Discord = require('discord.js');
const client = new Discord.Client();
const ytsr = require('ytsr');

module.exports = {
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','ADD_REACTIONS','MANAGE_MESSAGES'],
    run: async(client, message, args) => {

    const Duration = require("humanize-duration");
	if (used.has(message.author.id)) { 
    const cooldown = used.get(message.author.id);          
		 const remaining = Duration(cooldown - Date.now(), { units: ['h','m','s'], language: 'es', conjunction: ' y ', serialComma: false, round: true});
		 return message.channel.send(`Necesitas esperar ${remaining} para volver a usar este comando`).then(async(msg) => {
			  setTimeout(() => {
			  msg.delete();
			}, 5000)
			});  
		 }
		else{

            try {
                message.channel.startTyping();
                let filter1;
        
               
                const filters = await ytsr.getFilters(args.slice(0).join(" "));
        
            
                filter1 = filters.get("Type").find(o => o.name === "Video");
                let options = {
                    limit: 50,
                    nextpageRef: filter1.ref
                };
        
                
                const searchResults = await ytsr(null, options);
        
                if(!searchResults){
                    message.channel.stopTyping(true)
                    return message.reply("No encontre ningun resultado! Revisa tu busqueda")
                }
                if(!searchResults.items[0]){
                    message.channel.stopTyping(true)
                    return message.reply("No encontre ningun resultado! Revisa tu busqueda")
                }
                
                let i = 0;
                let max = searchResults.items.length - 1;
        
                
                const embed = new Discord.MessageEmbed()
                .setTitle(searchResults.items[i].title)
                .setURL(searchResults.items[i].link)
                .setDescription(searchResults.items[i].description || "Sin Descripcion")
                .addField('Canal De Youtube', `[${searchResults.items[i].author.name}](${searchResults.items[i].author.ref}) `+searchResults.items[i].author.verified ? "<a:verify:745065235596967997>" : "", true)
                .addField('Duracion', searchResults.items[i].duration, true)
                .addField('Vistas', searchResults.items[i].views, true)
                .addField('Fecha De Subida', searchResults.items[i].uploaded_at, true)
                .setFooter(`Resultado Numero: ${i + 1}/${max + 1}`)
                .setImage(searchResults.items[i].thumbnail)
                .setColor("RED")
        console.log(searchResults.items[i])
                const filter = (reaction, user) => {
                    return ['◀️', '▶️', '⏹️'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
                let msg = await message.channel.send(embed);
        
                await msg.react('◀️');
                await msg.react('▶️');
                await msg.react('⏹️');
                message.channel.stopTyping();
                let collector = msg.createReactionCollector(filter, { idle: 20000 })
                collector.on('collect', async (reaction, user) => {
                    if (reaction.emoji.name === '▶️') {
                        await reaction.users.remove(user.id);
                        if (max !== i) {
                            i++
                            embed.spliceFields(0, 4)
                            .setTitle(searchResults.items[i].title)
                            .setURL(searchResults.items[i].link)
                            .setDescription(searchResults.items[i].description || "Sin Descripcion")
                            .addField('Canal De Youtube', `[${searchResults.items[i].author.name}](${searchResults.items[i].author.ref}) `+searchResults.items[i].author.verified ? "<a:verify:745065235596967997>" : "", true)
                            .addField('Duracion', searchResults.items[i].duration, true)
                            .addField('Vistas', searchResults.items[i].views, true)
                            .addField('Fecha De Subida', searchResults.items[i].uploaded_at, true)
                            .setFooter(`Resultado Numero: ${i + 1}/${max + 1}`)
                            .setImage(searchResults.items[i].thumbnail)
                            await msg.edit(embed);
                        }
                    }
                    if (reaction.emoji.name === '◀️') {
                        await reaction.users.remove(user.id);
                        if (i !== 0) {
                            i--
                            embed.spliceFields(0, 4)
                            .setTitle(searchResults.items[i].title)
                            .setURL(searchResults.items[i].link)
                            .setDescription(searchResults.items[i].description || "Without description")
                            .addField('Canal De Youtube', `[${searchResults.items[i].author.name}](${searchResults.items[i].author.ref}) `+searchResults.items[i].author.verified ? "<a:verify:745065235596967997>" : "", true)
                            .addField('Duracion', searchResults.items[i].duration, true)
                            .addField('Vistas', searchResults.items[i].views, true)
                            .addField('Fecha De Subida', searchResults.items[i].uploaded_at, true)
                            .setFooter(`Resultado Numero: ${i + 1}/${max + 1}`)
                            .setImage(searchResults.items[i].thumbnail)
                            await msg.edit(embed);
                        }
                    }
                    if (reaction.emoji.name === '⏹️') {
                        collector.stop();
                    }
                })
                collector.on('end', collected => msg.reactions.removeAll())
        
            } catch (err) {
                message.channel.stopTyping();
                message.channel.send("Un error ocurrio! Puedes avisar al dev en el server de soporte. Aqui esta el error: " + err);
            }
            
		  used.set(message.author.id, Date.now() + milisegFromSeconds(5));
		  setTimeout(()=> used.delete(message.author.id), milisegFromSeconds(5));
    }


}
}