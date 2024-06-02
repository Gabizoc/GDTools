const discord = require('discord.js');

module.exports = async (client, oldSticker, newSticker) => {
    const logsChannel = await client.getLogs(newSticker.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `😜・Sticker modifié`,
        desc: `Un sticker a été modifé`,
        fields: [
            {
                name: `> Avant :`,
                value: `- ${oldSticker.name}`
            },
            {
                name: `> Aprés :`,
                value: `- ${newSticker.name}`
            },
            {
                name: `> ID :`,
                value: `- ${newSticker.id}`
            }
        ]
    }, logsChannel).catch(() => { })
};