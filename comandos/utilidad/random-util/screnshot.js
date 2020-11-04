const Discord = require('discord.js');
const check = require('../../../util/Functions/badUrls/nsfw')
const checkSingleCleanURL = require('../../../util/Functions/badUrls/checkURL')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: ['ss'],
guildOnly: true,
run: async (bot, message, args) => {

    if(!args[0])return message.channel.send('Necesitas ingresar una url!')

    let url = args[0].startsWith("http://") || args[0].startsWith("https://")? args[0] : `http://${args[0]}`
  
    const result = await checkSingleCleanURL(url)

    if (result && !message.channel.nsfw) return message.channel.send("Debes estar en un canal NSFW para ver cosas NSFW!");

    let form = await message.channel.send("Espera un momento!").catch(() => { });
    message.channel.startTyping().catch(() => { });
  
    setTimeout(() => {
        message.channel.stopTyping(true);
    }, 40000);


    try {
    
    let page = await global.browser.newPage()

    page.on("error", async error => {
        message.channel.stopTyping(true);
            await message.channel.send(`Hubo un error abriendo la web: ${error}`).catch(() => { });
            await form.delete().catch(() => { });
        });
      
    if (!page) return;

    await page.goto(url, { waitUntil: "networkidle2" })

    let screenshot = await page.screenshot({ type: "png" })

    if (!message.channel.nsfw) {
        const isNSFW = await check(screenshot);
            if(isNSFW) {
            message.channel.stopTyping(true);
            return message.channel.send("Encontre contenido NSFW en esa imagen ve a un canal NSFW porfavor");
            }
        }

    const attachment = new Discord.MessageAttachment(screenshot, "file.png");

    message.channel.stopTyping(true);

    await message.channel.send("Ping: " + (Date.now() - (form.editedTimestamp || form.createdTimestamp)) / 1000 + "s", attachment)
    await form.delete().catch(() => {});

    try {
        if (page && page.close && page.close instanceof Function) {
          await page.close();
        }
    } catch (error) {
        console.log(error);
    }
    
    } catch (err) {

      message.channel.stopTyping(true);

      await message.channel.send(`Un error ocurrio aqui lo puedes ver: ${err}`).catch(() => { });

      return await form.delete().catch(() => { });
    }
    }
} 

module.exports.help = {
name: 'screenshot',
description: 'Toma una screenshot',
cooldown: [],
alias: ['ss'],
usage: 'screenshot [url]',
example: 'screenshot https://www.google.com'
}