const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    aliases: ['gfont'],
    permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
    run: async(client, message, args) => {
            
        if(!args[0]) return message.channel.send("Debes de escribir algo!")
        message.delete()
  
  
        let texto = args.join('%20'); 
        
        let attachment = new Discord.MessageAttachment(`https://gdcolon.com/tools/gdlogo/img/${texto}`, 'logo.png')
        
        message.channel.send(attachment)
    }
}
