const discord = require('discord.js');

module.exports = async (client, role, oldColor, newColor) => {
    const logsChannel = await client.getLogs(role.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `🧻・Couleur de rôle modifié`,
        desc: `La couleur d'un rôle a été modfié !`,
        fields: [
            {
                name: `> Rôle :`,
                value: `- ${role}`
            },
            {
                name: `> Avant :`,
                value: `- #${oldColor.toString(16)}`
            },
            {
                name: `> Arpès :`,
                value: `- #${newColor.toString(16)}`
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