const Discord = require('discord.js');

module.exports = async (client, role, oldPerms, newPerms) => {

    const logsChannel = await client.getLogs(role.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `🧻・Permission modifié`,
        desc: `Les permission d'un rôle ont été modifié`,
        fields: [
            {
                name: `> Role`,
                value: `- ${role}`
            },
            {
                name: `> Avant`,
                value: `- ${new Discord.PermissionsBitField(oldPerms).toArray().toLocaleString().split(',').join(', ') || 'None'}`
            },
            {
                name: `> Arpès`,
                value: `- ${new Discord.PermissionsBitField(newPerms).toArray().toLocaleString().split(',').join(', ') || 'None'}`
            },
            {
                name: `> ID :`,
                value: `${role.id}`
            },
            {
                name: `> Heure :`,
                value: `<t:${Math.floor(Date.now() / 1000)}:R>`
            }
        ]
    }, logsChannel).catch(() => { })
};