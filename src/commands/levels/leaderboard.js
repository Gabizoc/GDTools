const Discord = require('discord.js');

const Schema = require("../../database/models/levels");

module.exports = async (client, interaction, args) => {
    const rawLeaderboard = await Schema.find({ guildID: interaction.guild.id }).sort(([['xp', 'descending']])).exec();

    if (!rawLeaderboard) return client.errNormal({
        error: `Pas de donnée trouvé !`,
        type: 'editreply'
    }, interaction);

    const lb = rawLeaderboard.map(e => `**${rawLeaderboard.findIndex(i => i.guildID === interaction.guild.id && i.userID === e.userID) + 1}** | <@!${e.userID}> - Niveaux : \`${e.level.toLocaleString()}\` (${e.xp.toLocaleString()} xp)`);

    await client.createLeaderboard(`🆙・Niveaux - ${interaction.guild.name}`, lb, interaction);
}

 