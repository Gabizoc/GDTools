const Discord = require('discord.js');

module.exports = async (client, guild, bannerURL) => {
    const logsChannel = await client.getLogs(guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `🖼️・Nouvelle Banniére `,
        desc: `La banniére de serveur a été mis à jour`,
        image: bannerURL
    }, logsChannel).catch(() => { })
};