const discord = require('discord.js');

module.exports = async (client, channel) => {
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

    console.log(channel.type)
    client.embed({
        title: `🔧・Channel créé`,
        desc: `Un channel a été créé :`,
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