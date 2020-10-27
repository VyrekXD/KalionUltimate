const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const check = require('../../../util/Functions/badUrls/nsfw')
const checkSingleCleanURL = require('../../../util/Functions/badUrls/checkURL')

module.exports = {
permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS'],
aliases: [],
guildOnly: true,
run: async (bot, message, args, send) => {
 
    if(!args[0])return message.channel.send('Necesitas ingresar una url!')

    let url = args[0]

    const result = await checkSingleCleanURL(url)

    if (result && !message.channel.nsfw) return message.channel.send("Debes estar en un canal NSFW para ver cosas NSFW!");

    let form = await message.channel.send("Espera un momento!").catch(() => { });
    message.channel.startTyping().catch(() => { });

    setTimeout(() => {
        message.channel.stopTyping(true);
    }, 40000);

    let page = await global.browser.newPage().catch(async error => {
        message.channel.stopTyping(true);
        await message.channel.send(`Un error ocurrio aqui lo puedes ver: ${error}`).catch(() => { });
        await form.delete().catch(() => { });
        return
    })
    page.on("error", async error => {
    message.channel.stopTyping(true);
        await message.channel.send(`Hubo un error abriendo la web: ${error}`).catch(() => { });
        await form.delete().catch(() => { });
    });

    if (!page) return;

    await page.goto(url, { waitUntil: "networkidle2" }).catch(async error => {
        message.channel.stopTyping(true);
        await message.channel.send(`Un error ocurrio aqui lo puedes ver: ${error}`).catch(() => { });
        await form.delete().catch(() => { });
        return
    })
    let screenshot = await page.screenshot({ type: "png" }).catch(async error => {
        message.channel.stopTyping(true);
        await message.channel.send(`Un error ocurrio aqui lo puedes ver: ${error}`).catch(() => { });
        await form.delete().catch(() => { });
        return
    })

    if (!message.channel.nsfw) {
    const isNSFW = await check(screenshot);
        if(isNSFW) {
        message.channel.stopTyping(true);
        return message.channel.send("Huuuy.... hay contenido NSFW en la imagen mejor ve esto en otro canal que sea NSFW pillin...");
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
   }
}