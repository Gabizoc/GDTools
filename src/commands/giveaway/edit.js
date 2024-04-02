const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const messageID = interaction.options.getString('message');
    const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageID);
    if (!giveaway) return client.errNormal({ error: "Ce message n'est pas dans ce serveur !", type: 'editreply' }, interaction)
    client.giveawaysManager.edit(messageID, {
        addTime: 5000,
    }).then(() => {
        const numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 1000;
        client.succNormal({
            text: `Le giveaway sera mise à jour dans moins de ${numberOfSecondsMax} secondes`,
            type: 'editreply'
        }, interaction);
    }).catch((err) => {
        client.errNormal({
            error: `Je n'est pas trouvé le giveaway d'ID : ${messageID}!`,
            type: 'editreply'
        }, interaction)
    });
}

 