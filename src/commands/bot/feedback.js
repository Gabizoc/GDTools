const Discord = require('discord.js');

const webhookClient = new Discord.WebhookClient({
    id: "1226509070517927957",
    token: "NhKJW0U20nnX-bh3_B4V4Z1I_1oBB_TGRd_lAdK0ShZgRwXk9Pb70DAX9OPcEKSWBzC8",
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

 