const Discord = require('discord.js');

module.exports = async (client, oldMessage, newMessage) => {
    try {
        if (!oldMessage.content || !newMessage.content) return;
        if (oldMessage.content === newMessage.content) return;
        if (oldMessage.author.bot) return;

        const logsChannel = await client.getLogs(oldMessage.guild.id);
        if (!logsChannel) return;

let row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setEmoji("🔗")
                        .setLabel("Aller au message")
                        .setURL(`https://discordapp.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id}`)
                        .setStyle(Discord.ButtonStyle.Link),
                  );
      
        client.embed({
            title: `💬・Message Modifié`,
            desc: `Un message a été modifié !`,
            fields: [
                {
                    name: `> Autheur :`,
                    value: `- ${newMessage.member.user} (${newMessage.member.user.tag})`
                },
                {
                    name: `> Date : `,
                    value: `- ${newMessage.createdAt}`
                },
                {
                    name: `> Channel :`,
                    value: `- ${newMessage.channel} (${newMessage.channel.name})`
                },
                {
                    name: `> Ancien message :`,
                    value: `\`\`\`${oldMessage.content.replace(/`/g, "'")}\`\`\``
                },
                {
                    name: `> Nouveau message :`,
                    value: `\`\`\`${newMessage.content.replace(/`/g, "'")}\`\`\``
                },
                {
                    name: `> Heure :`,
                    value: `- <t:${Math.floor(newMessage.createdTimestamp / 1000)}:R>`
                }
            ],
            components: [row]
        }, logsChannel).catch(() => { })
    }
    catch { }
};
