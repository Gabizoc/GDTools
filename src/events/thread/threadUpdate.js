const discord = require('discord.js');

module.exports = async (client, oldChannel, newChannel) => {
    let types = {
        10: "News Thread",
        11: "Public Thread",
        12: "Private Thread",
    }

    const logsChannel = await client.getLogs(newChannel.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `📖・Fil modfié`,
        desc: `Un fil a été modifié !`,
        fields: [
            {
                name: `> Ancien nom :`,
                value: `- ${oldChannel.name}`
            },
            {
                name: `> Nouveau nom :`,
                value: `- ${newChannel.name}`
            },
            {
                name: `> ID :`,
                value: `- ${newChannel.id}`
            },
            {
                name: `> Categorie :`,
                value: `${newChannel.parent}`
            },
            {
                name: `> Channel :`,
                value: `<#${newChannel.id}>`
            },
            {
                name: `> Type :`,
                value: `${types[newChannel.type]}`
            }
        ]
    }, logsChannel).catch(() => { })
};