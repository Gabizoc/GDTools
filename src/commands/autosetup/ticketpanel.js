const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");

module.exports = async (client, interaction, args) => {
    ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, ticketData) => {
        if (ticketData) {
            const channel = interaction.guild.channels.cache.get(ticketData.Channel);
            const button = new Discord.ButtonBuilder()
                .setCustomId('Bot_openticket')
                .setLabel("Tickets")
                .setStyle(Discord.ButtonStyle.Primary)
                .setEmoji('🎫')

            const row = new Discord.ActionRowBuilder()
                .addComponents(button)

            client.embed({
                title: "Tickets",
                desc: "Clique sur 🎫 pour ouvrir un ticket",
                components: [row]
            }, channel)

            client.succNormal({
                text: `Le panel de ticket à bien été généré`,
                type: 'editreply'
            }, interaction);
        }
        else {
            client.errNormal({
                error: `Créer le panel de ticket d'abord`,
                type: 'editreply'
            }, interaction);
        }
    })
}

 