const discord = require('discord.js');

module.exports = async (client, channel) => {
    let types = {
        10: "News Thread",
        11: "Public Thread",
        12: "Private Thread",
    }

    const logsChannel = await client.getLogs(channel.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `📖・Fil supprimé`,
        desc: `Un fil a été supprimé`,
        fields: [
            {
                name: `> Nom :`,
                value: `- ${channel.name}`
            },
            {
                name: `> ID :`,
                value: `- ${channel.id}`
            },
            {
                name: `> Categorie :`,
                value: `${channel.parent}`
            },
            {
                name: `> Type :`,
                value: `${types[channel.type]}`
            }
        ]
    }, logsChannel).catch(() => { })
};