const discord = require('discord.js');

module.exports = async (client, user, mod) => {
    const logsChannel = await client.getLogs(user.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `🔨・Membre Désavertie`,
        desc: `Le membre a été désavertie`,
        fields: [
            {
                name: `> Membre`,
                value: `- ${user}`
            },
            {
                name: `> Tag`,
                value: `- ${user.user.username}#${user.user.discriminator}`
            },
            {
                name: `> ID`,
                value: `${user.id}`
            },
            {
                name: `> Moderateur`,
                value: `${mod} (${mod.id})`
            }
        ]
    }, logsChannel).catch(() => { })
};