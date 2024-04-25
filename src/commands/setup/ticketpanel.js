const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");

module.exports = async (client, interaction, args) => {
    const name = interaction.options.getString('name');
    const description = interaction.options.getString('description');

    ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, ticketData) => {
        if (ticketData) {
            const channel = interaction.guild.channels.cache.get(ticketData.Channel);
            const button = new Discord.ButtonBuilder()
                .setCustomId('Bot_openticket')
                .setLabel(name)
                .setStyle(Discord.ButtonStyle.Primary)
                .setEmoji('🎫')

            const row = new Discord.ActionRowBuilder()
                .addComponents(button)

            client.embed({
                title: name,
                desc: description,
                components: [row]
            }, channel)

            client.succNormal({
                text: `Le panel de ticket a bien été générer !`,
                type: 'editreply'
            }, interaction);
        }
        else {
            client.errNormal({
                error: `Exécutez d’abord la configuration des tickets !`,
                type: 'editreply'
            }, interaction);
        }
    })
}

 