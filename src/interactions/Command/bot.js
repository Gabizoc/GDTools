const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot')
        .setDescription('Information sur le bot')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Liste les commandes du bot')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('info')
                .setDescription('Liste les commandes de  bot')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ping')
                .setDescription('Envoie le ping du bot')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('changelogs')
                .setDescription('Envoie le change log')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('donate')
                .setDescription('Envoie le lien de donation')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('links')
                .setDescription('Envoie un message avec tous les liens')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('socials')
                .setDescription('Get the Bot socials')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('support')
                .setDescription(`Envoie le lien d'invitation du support`)
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('vote')
                .setDescription('Regarde si vous avez voté')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('feedback')
                .setDescription('Envoie nous un message :)')
                .addStringOption(option => option.setName("feedback").setDescription("Your feedback").setRequired(true))
        ),

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

 