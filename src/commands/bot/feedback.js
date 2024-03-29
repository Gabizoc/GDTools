const Discord = require('discord.js');

const webhookClient = new Discord.WebhookClient({
    id: "1222268211723239434",
    token: "stUe96lFLRmL0n0f6ZbO3wccYhY65DRk6W0m8JdL3ip5y2FUyIwoBmUbmXELUgaAvgAS",
});

module.exports = async (client, interaction, args) => {
    const feedback = interaction.options.getString('feedback');

    const embed = new Discord.EmbedBuilder()
        .setTitle(`📝・Suggestion`)
        .addFields(
            { name: "Membre", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
        )
        .setDescription(`${feedback}`)
        .setColor(client.config.colors.normal)
    webhookClient.send({
        username: 'Suggestion',
        embeds: [embed],
    });

    client.succNormal({ 
        text: `Suggestion bien envoyé au developeur`,
        type: 'editreply'
    }, interaction);
}

 