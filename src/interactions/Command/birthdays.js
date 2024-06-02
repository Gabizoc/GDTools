const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('birthdays')
        .setDescription('Voir ou enregistrer un aniversaire')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Donne des informations sur les commandes d aniversaire')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('check')
                .setDescription('Chek un aniversaire')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('supprime')
                .setDescription('Supprimer un aniversaire')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('liste')
                .setDescription('Voir tous les aniversaire enregistrer')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('créer')
                .setDescription('Enregistre un aniversaire')
                .addNumberOption(option => option.setName('day').setDescription('Le jours de ton anniverssaire').setRequired(true))
                .addNumberOption(option => option.setName('month').setDescription('Le mois de ton anniverssaire').setRequired(true))
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        client.loadSubcommands(client, interaction, args);
    },
};

 