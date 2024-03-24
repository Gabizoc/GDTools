const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const model = require('../../database/models/badge');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('developers')
        .setDescription('Command pour les developpers du bot')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtien des informations sur cette commande')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('eval')
                .setDescription('Avoir le resultat d un code')
                .addStringOption(option => option.setName('code').setDescription('Your code').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('badge')
                .setDescription('Gére les badges')
                .addBooleanOption(option => option.setName('new').setDescription('Select a boolean').setRequired(true))
                .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true))
                .addStringOption(option => option.setName('badge').setDescription('Choose your badge').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ban')
                .setDescription('Gére les bans')
                .addBooleanOption(option => option.setName('new').setDescription('Select a boolean').setRequired(true))
                .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('credits')
                .setDescription('Gére les crédits du bot')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Le type de credit')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Ajout', value: 'add' },
                            { name: 'Supprimer', value: 'remove' }
                        )
                )
                .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true))
                .addNumberOption(option => option.setName('amount').setDescription('Amount of credits').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('args')
                .setDescription('Post un message préfet')
                .addStringOption(option =>
                    option.setName('message')
                        .setDescription('Selectione ton message')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Information', value: 'information' },
                            { name: 'Rules', value: 'rules' },
                            { name: 'Applications', value: 'applications' },
                            { name: 'Booster perks', value: 'boosterperks' },
                            { name: 'Links', value: 'links' },
                            { name: 'Rewards', value: 'rewards' },
                            { name: 'Our bots', value: 'ourbots' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('servers')
                .setDescription('Voir tous les serveurs sur cette shard')
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        model.findOne({ User: interaction.user.id }, async (err, data) => {
            if (data && data.FLAGS.includes("DEVELOPER")) {
                await interaction.deferReply({ fetchReply: true });
                client.loadSubcommands(client, interaction, args);
            } else {
                return client.errNormal({
                    error: 'Seulement les developper peuvent utiliser cette commandes',
                    type: 'ephemeral'
                }, interaction)
            }
        })
    },
};

 