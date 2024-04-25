const discord = require('discord.js');

module.exports = async (client, oldEvent, newEvent) => {
    const logsChannel = await client.getLogs(newEvent.guildId);
    if (!logsChannel) return;

    client.embed({
        title: `🎡・Evènement mis à jours !`,
        desc: `An event has been updated`,
        fields: [
            {
                name: `> Ancien Nom :`,
                value: `- ${oldEvent.name}`
            },
            {
                name: `> Nouveau Nom :`,
                value: `- ${newEvent.name}`
            },
            {
                name: `> Ancienne Description :`,
                value: `- ${oldEvent.description || 'None'}`
            },
            {
                name: `> Nouvelle Description :`,
                value: `- ${newEvent.description || 'None'}`
            },
            {
                name: `> Ancien Temps :`,
                value: `- <t:${(oldEvent.scheduledStartTimestamp / 1000).toFixed(0)}>`
            },
            {
                name: `> Nouveau Temps :`,
                value: `- <t:${(newEvent.scheduledStartTimestamp / 1000).toFixed(0)}>`
            },
            {
                name: `> Createur :`,
                value: `- <@!${newEvent.creatorId}> (${newEvent.creatorId})`
            },
            {
                name: `> Heures :`,
                value: `- <t:${Math.floor(Date.now() / 1000)}:R>`
            }
        ]
    }, logsChannel).catch(() => { })
};