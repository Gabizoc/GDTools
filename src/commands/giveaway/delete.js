const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const messageID = interaction.options.getString('message');
    const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageID);
    if (!giveaway) return client.errNormal({ error: "Ce message n'est pas dans ce serveur !", type: 'editreply' }, interaction)
    client.giveawaysManager.delete(messageID).then(() => {
        client.succNormal({
            text: `Le giveaway a bien été supprimé`,
            type: 'editreply'
        }, interaction);
    }).catch((err) => {
        client.errNormal({
            error: `Impossible de trouver le gieaway avec ID : ${messageID}!`,
            type: 'editreply'
        }, interaction)
    });
}

 