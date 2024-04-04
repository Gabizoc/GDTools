const Discord = require('discord.js');

const Schema = require("../../database/models/levelRewards");

module.exports = async (client, interaction, args) => {
    const rawLeaderboard = await Schema.find({ Guild: interaction.guild.id });

    if (rawLeaderboard.length < 1) return client.errNormal({
        error: `Pas de récompence trouvé !`,
        type: 'editreply'
    }, interaction);

    const lb = rawLeaderboard.map(e => `**Niveau ${e.Level}** - <@&${e.Role}>`);

    await client.createLeaderboard(`🆙・Récompense de niveau - ${interaction.guild.name}`, lb, interaction);
}

 