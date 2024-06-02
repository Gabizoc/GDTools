const discord = require('discord.js');

module.exports = async (client, role) => {
    const logsChannel = await client.getLogs(role.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `🧻・Rôle supprimé`,
        desc: `Un rôle a été supprmé !`,
        fields: [
            {
                name: `> Rôle :`,
                value: `- ${role}`
            },
            {
                name: `> Nom :`,
                value: `- ${role.name}`
            },
            {
                name: `> ID :`,
                value: `- ${role.id}`
            },
            {
                name: `> Couleur :`,
                value: `${role.hexColor}`
            },
            {
                name: `> Position :`,
                value: `${role.position}`
            },
            {
                name: `> Heure :`,
                value: `- <t:${Math.floor(Date.now() / 1000)}:R>`
            }
        ]
    }, logsChannel).catch(() => { })
};