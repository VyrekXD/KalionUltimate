const fetch = require('node-fetch')

module.exports = Message => {
    return class extends Message {
        constructor(client, data){
            super(client, data);
        }

        async newReply(id, channel, content){
            const megadb = JSON.stringify({
                content: content,
                message_reference: {
                message_id:id,
                channel_id: channel,
                guild_id: message.guild.id
                }
               });
               
               const request = await fetch(`https://discord.com/api/v8/channels/${channel}/messages`, { 
                method: 'post',
                body: megadb,
                headers: {
                Authorization: `Bot ${client.token}`,
                'Content-Type': 'application/json'
                }
               });
               request.json(); return true;
        }
    }
}