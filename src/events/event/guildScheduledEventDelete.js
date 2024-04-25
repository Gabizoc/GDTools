const discord = require('discord.js');

module.exports = async (client, event) => {
    let types = {
        GUILD_ONLY: "Server only",
        PUBLIC: "Public",
    }

    let locations = {
        NONE: "None",
        STAGE_INSTANCE: "Stage Channel",
        VOICE: "Voice Channel",
        EXTERNAL: `External`
    }

    const logsChannel = await client.getLogs(event.guildId);
    if (!logsChannel) return;

    client.embed({
        title: `🎡・Evènement supprimé !`,
        desc: `Un évènement a été supprimé !`,
        fields: [
            {
                name: `> Nom :`,
                value: `- ${event.name}`
            },
            {
                name: `> Description :`,
                value: `- ${event.description || 'None'}`
            },
            {
                name: `> Commence :`,
                value: `- <t:${(event.scheduledStartTimestamp / 1000).toFixed(0)}>`
            },
            {
                name: `> Confidentialité :`,
                value: `- ${types[event.privacyLevel]}`
            },
            {
                name: `> Createur :`,
                value: `- <@!${event.creatorId}> (${event.creatorId})`
            },
            {
                name: `> Location :`,
                value: `- ${locations[event.entityType]}`
            },
            {
                name: `> Heure :`,
                value: `- <t:${Math.floor(Date.now() / 1000)}:R>`
            }
        ]
    }, logsChannel).catch(() => { })
};