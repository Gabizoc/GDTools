const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const Schema = require("../../database/models/music");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Se mettre en mode AFK')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Avoir des informations sur la catégorie afk')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Se mettre en mode AFK')
                .addStringOption(option => option.setName('reason').setDescription('Réson de votre AFk'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Montre tous les personnes actuellement AFK')
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

 