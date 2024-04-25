const discord = require('discord.js');

module.exports = async (client, channel, oldName, newName) => {
    let types = {
        0: "Text Channel",
        2: "Vocal",
        4: "Catégorie",
        5: "Channel d'Annonce",
        10: "Nouveau Fil",
        11: "Nouveau Fil Public",
        12: "Fil Privé",
        13: "Conférence",
        14: "Catégorie",
    }

    const logsChannel = await client.getLogs(channel.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `🔧・Nom d'un channel modifié`,
        desc: `Un nom de channel a été modifé :`,
        fields: [
            {
                name: `> Ancien nom :`,
                value: `- ${oldName}`
            },
            {
                name: `> Nouveau nom :`,
                value: `- ${newName}`
            },
            {
                name: `> ID :`,
                value: `- ${channel.id}`
            },
            {
                name: `> Categorie :`,
                value: `- ${channel.parent}`
            },
            {
                name: `> Channel :`,
                value: `- <#${channel.id}>`
            },
            {
                name: `> Type :`,
                value: `- ${types[channel.type]}`
            }
        ]
    }, logsChannel).catch(() => { })
};