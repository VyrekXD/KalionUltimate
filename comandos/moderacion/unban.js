const Discord = require('discord.js');

module.exports = {
  permisos: ['VIEW_CHANNEL','SEND_MESSAGES','EMBED_LINKS','BAN_MEMBERS'],
  guildOnly: true,
  run: async(client, message, args) => {
  let memberx = message.mentions.members.first() ||
      message.guild.members.cache.get(args[0])
      
      if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
        return message.channel.send("No tengo los permisos suficientes");
      }
      if (!memberx)
      return message.channel.send(
        "Dame la ID del usuario al que deseas desbanear."
      );
    //This if() checks if we typed anything after "!unban"

    let bannedMember;
    //This try...catch solves the problem with the await
    try {
      bannedMember = await client.users.fetch(memberx);
    } catch (e) {
      if (!bannedMember)
        return message.channel.send("El miembro proporcionado no es valido");
    }
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      const embed = new Discord.MessageEmbed()
        .setTitle("<a:error:721475630688108554> ERROR Permisos Insuficientes")
        .setThumbnail(
          "https://media.giphy.com/media/3osxY9kuM2NGUfvThe/giphy.gif"
        )
        .setDescription("Permisos insuficientes para ejecutar este comando ")
        .setColor("RANDOM");
      return message.channel.send(embed);
    }

    //Check if the user is not banned
    try {
      await message.guild.fetchBan(memberx);
    } catch (e) {
      message.channel.send("El usuario no esta baneado del server.");
      return;
    }

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "...";

    if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
      return message.channel.send("No tengo los permisos suficientes.");
    message.delete();
    try {
      message.guild.members.unban(bannedMember, { reason: reason });
      message.channel.send(`${bannedMember.tag} was readmitted.`);
    } catch (e) {
      console.log(e.message);
    }
  
}
}