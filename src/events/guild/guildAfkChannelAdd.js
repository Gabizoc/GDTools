const Discord = require('discord.js');

module.exports = async (client, guild, afkChannel) => {
    const logsChannel = await client.getLogs(guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `🛑・Nouveau channel d'afk`,
        desc: `Un nouveau channel d'afk a été séléctioné`,
        fields: [
            {
                name: `> Channel :`,
                value: `- ${afkChannel}`
            },
            {
                name: `> Nom :`,
                value: `- ${afkChannel.name}`
            },
            {
                name: `> ID :`,
                value: `- ${afkChannel.id}`
            },
            {
                name: `> Heure :`,
                value: `- <t:${Math.floor(afkChannel.createdTimestamp / 1000)}:R>`
            }
        ]
    }, logsChannel).catch(() => { })
};