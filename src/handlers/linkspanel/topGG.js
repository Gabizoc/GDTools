const Discord = require('discord.js');

module.exports = async (client) => {
    client.on(Discord.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId == "Bot-linkspanel") {
            if (interaction.values == "top.gg-linkspanel") {
                interaction.deferUpdate();

                const row2 = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder()
                            .setCustomId('Bot-linkspanel')
                            .setPlaceholder('❌┆Rien de séléctioné')
                            .addOptions([
                                {
                                    label: `Serveur de support`,
                                    description: `Rejoint le serveur support`,
                                    emoji: "❓",
                                    value: "support-linkspanel",
                                },
                                {
                                    label: `Invite le Bot`,
                                    description: `Invite le bot à ton serveur !`,
                                    emoji: "📨",
                                    value: "invite-linkspanel",
                                },
                                {
                                    label: `Serveur communautaire`,
                                    description: `Rejoint le serveur communautaire`,
                                    emoji: "🌍",
                                    value: "community-linkspanel",
                                },
                                {
                                    label: `Top.gg`,
                                    description: `Vote pour moi !`,
                                    emoji: "📃",
                                    value: "top.gg-linkspanel",
                                },
                            ]),
                    );

                let row = new Discord.ActionRowBuilder()
                    .addComponents(

                        new Discord.ButtonBuilder()
                            .setLabel("Vote maintenant !")
                            .setURL("https://top.gg/bot/798144456528363550/vote")
                            .setStyle(Discord.ButtonStyle.Link),
                    );

                client.embed({
                    title: `📃・Bot Vote`,
                    desc: `Vote pour moi sur top.gg`,
                    image: "https://cdn.discordapp.com/attachments/843487478881976381/874694192755007509/Bot_banner_vote.jpg",
                    url: "https://top.gg/bot/798144456528363550/vote",
                    components: [row2, row],
                    type: 'edit'
                }, interaction.message)
            }
        }
    })
}

 