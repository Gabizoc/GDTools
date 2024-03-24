const discord = require('discord.js');

/**
 * @param {discord.Client} client 
 * @param {discord.GuildMember} user 
 * @param {discord.User} mod 
 * @param {string} reason 
 * @returns
 */
module.exports = async (client, user, mod, reason) => {
    const logsChannel = await client.getLogs(user.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `🔨・Membre Avertie`,
        desc: `Un membre a été avertie`,
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
            },
            {
                name: `> Réson`,
                value: `${reason}`
            }
        ]
    }, logsChannel).catch(() => {
        console.log
     })
};