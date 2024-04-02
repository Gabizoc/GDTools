const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const messageID = interaction.options.getString('message');
    const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageID);
    if (!giveaway) return client.errNormal({ error: "Ce message n'est pas dans ce serveur !", type: 'editreply' }, interaction)
    client.giveawaysManager.pause(messageID).then(() => {
        client.succNormal({ 
            text: `Giveaway mit en pause !!`, 
            type: 'editreply' 
        }, interaction);
    }).catch((err) => {
        client.errNormal({ 
            error: `Je n'arrive pas à trouver le giveaway d'ID : ${messageID}!`, 
            type: 'editreply' 
        }, interaction)
    });
}

 