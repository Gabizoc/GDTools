const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const perms = await client.checkPerms({
        flags: [Discord.PermissionsBitField.Flags.ModerateMembers],
        perms: [Discord.PermissionsBitField.Flags.ModerateMembers]
    }, interaction);

    if (perms == false) return;

    const user = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
    const time = interaction.options.getNumber('time');
    const reason = interaction.options.getString('reason');

    if (user.isCommunicationDisabled()) return client.errNormal({
        error: `${user} est déjà temporairement mute`,
        type: 'editreply'
    }, interaction);

    user.timeout(time * 60 * 1000, reason).then(m => {
        client.succNormal({
            text: `${user} a bien été temporairement mute pendant **${time} minutes**`,
            fields: [
                {
                    name: `💬┆Réson :`,
                    value: `${reason}`
                }
            ],
            type: 'editreply'
        }, interaction)
    }).catch(e => {
        client.errNormal({
            error: `Je ne peux pas temporairement mute ${user.tag}`,
            type: 'editreply'
        }, interaction);
    })
}

 