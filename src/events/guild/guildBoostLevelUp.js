const Discord = require('discord.js');

module.exports = async (client, guild, oldLevel, newLevel) => {
    const logsChannel = await client.getLogs(guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `🆙・Nouveau Niveau de Boost`,
        desc: `Le niveau du boost de serveur a régréssé`,
        fields: [
            {
                name: `> Ancien Niveau :`,
                value: `- ${oldLevel}`
            },
            {
                name: `> Nouveau Niveau :`,
                value: `- ${newLevel}`
            },
            {
                name: `> Heure :`,
                value: `- <t:${Math.floor(Date.now() / 1000)}:R>`
            }
        ]
    }, logsChannel).catch(() => { })
};