const discord = require('discord.js');

module.exports = async (client, role, oldName, newName) => {
    const logsChannel = await client.getLogs(role.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `🧻・Nom modifié`,
        desc: `Le nom d'un rôle a été modifié !`,
        fields: [
            {
                name: `> Rôle :`,
                value: `- ${role}`
            },
            {
                name: `> Avant :`,
                value: `- ${oldName}`
            },
            {
                name: `> Arès :`,
                value: `- ${newName}`
            },
            {
                name: `> ID :`,
                value: `${role.id}`
            },
            {
                name: `> Heure :`,
                value: `- <t:${Math.floor(Date.now() / 1000)}:R>`
            }
        ]
    }, logsChannel).catch(() => { })
};