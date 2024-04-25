const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");
const ticketChannels = require("../../database/models/ticketChannels");
const ticketMessageConfig = require("../../database/models/ticketMessage");

module.exports = async (client, interaction, args) => {
    const data = await ticketSchema.findOne({ Guild: interaction.guild.id });
    const ticketData = await ticketChannels.findOne({ Guild: interaction.guild.id, channelID: interaction.channel.id });

    let type = 'reply';
    if (interaction.isCommand()) type = 'editreply';

    if (ticketData) {
        if (ticketData.resolved == true) return client.errNormal({
            error: "Ce ticket est déjà fermé !",
            type: 'ephemeraledit'
        }, interaction);

        if (data) {
            const ticketCategory = interaction.guild.channels.cache.get(data.Category);
            const logsChannel = interaction.guild.channels.cache.get(data.Logs);

            if (ticketCategory == undefined) {
                return client.errNormal({
                    error: "Initialise le systéme de ticket !",
                    type: type
                }, interaction);
            }

            if (interaction.guild.channels.cache.find(c => c.id === ticketCategory.id)) {
                client.users.fetch(ticketData.creator).then(async usr => {
                    interaction.channel.permissionOverwrites.edit(usr, {
                        ViewChannel: false,
                        SendMessages: false,
                        AttachFiles: false,
                        ReadMessageHistory: false,
                        AddReactions: false
                    });

                    try {
                        var closeMessageTicket = "Voici la transcription de votre ticket, merci de la conserver si jamais vous souhaitez vous y référer !";
                        let ticketMessageData = await ticketMessageConfig.findOne({ Guild: interaction.guild.id });
                        if (ticketMessageData) {
                            closeMessageTicket = ticketMessageData.dmMessage;
                        }

                        client.embed({
                            desc: closeMessageTicket,
                            fields: [
                                {
                                    name: "👤┆Fermé par :",
                                    value: `${interaction.user}`,
                                    inline: true
                                },
                                {
                                    name: "📄┆ID du ticket :",
                                    value: `${ticketData.TicketID}`,
                                    inline: true
                                },
                                {
                                    name: "💬┆Serveur :",
                                    value: `${interaction.guild.name}`,
                                    inline: true
                                }
                            ]
                        }, usr)
                        client.transcript(interaction, usr).catch(() => { });
                    }
                    catch (err) { }
                })

                if (logsChannel) {
                    client.embed({
                        title: `🔒・Ticket fermé`,
                        desc: `Ce ticket est verouiller`,
                        color: client.config.colors.error,
                        fields: [
                            {
                                name: "📘┆ID du Ticket :",
                                value: `${ticketData.TicketID}`,
                            },
                            {
                                name: "👤┆Fermer par :",
                                value: `${interaction.user.tag} (${interaction.user.id})`,
                            },
                            {
                                name: "👤┆Createur :",
                                value: `<@!${ticketData.creator}>`,
                            },
                            {
                                name: "✋┆Gérer par :",
                                value: `<@!${ticketData.creator}>`,
                            },
                            {
                                name: "⏰┆Date :",
                                value: `<t:${(Date.now() / 1000).toFixed(0)}:F>`,
                            }
                        ]
                    }, logsChannel)
                    client.transcript(interaction, logsChannel);
                }

                ticketData.resolved = true;
                ticketData.save();

                interaction.channel.edit({ name: `ticket-closed` });
                client.simpleEmbed({
                    desc: `Ticket fermé par <@!${interaction.user.id}>`,
                    type: type
                }, interaction)

                const row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('Bot_transcriptTicket')
                            .setEmoji('📝')
                            .setStyle(Discord.ButtonStyle.Primary),

                        new Discord.ButtonBuilder()
                            .setCustomId('Bot_openTicket')
                            .setEmoji('🔓')
                            .setStyle(Discord.ButtonStyle.Primary),

                        new Discord.ButtonBuilder()
                            .setCustomId('Bot_deleteTicket')
                            .setEmoji('⛔')
                            .setStyle(Discord.ButtonStyle.Danger),
                    );

                client.embed({
                    title: "🔒・Fermé",
                    desc: `📝 - Transrire \n🔓 - Réouvrir \n⛔ - Supprimer`,
                    components: [row],
                }, interaction.channel)
            }
            else {
                return client.errNormal({
                    error: "Active le systéme de ticket d'abord!",
                    type: type
                }, interaction);

            }
        }
        else {
            return client.errNormal({
                error: "Active le systéme de ticket d'abord!",
                type: type
            }, interaction)
        }
    }
}

 