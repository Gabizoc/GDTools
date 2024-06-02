const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autosetup')
        .setDescription('Configure les modules automatiquement')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Donne des informations sur cette commande')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('logs')
                .setDescription('Configure le systéme de logs')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('Le systéme de votre choix')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Logs de serveur', value: 'serverLogs' },
                            { name: 'Logs de niveau', value: 'levelLogs' },
                            { name: 'Logs de boost', value: 'boostLogs' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('fun')
                .setDescription('Configure les channels fun')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('Le systéme de votre choix')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Birthdays', value: 'birthdays' },
                            { name: 'Chatbot', value: 'chatbot' },
                            { name: 'Reviews', value: 'reviews' },
                            { name: 'Suggestions', value: 'suggestions' },
                            { name: 'Starboard', value: 'starboard' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('games')
                .setDescription('Configure les channels de jeu')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('Le jeu de votre choix')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Counting', value: 'counting' },
                            { name: 'Guess the number', value: 'gtn' },
                            { name: 'Guess the word', value: 'gtw' },
                            { name: 'Word snake', value: 'wordsnake' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('welcome')
                .setDescription('Configure le syséme de bienvenue.=')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('Quel systéme ?')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Channel de bienvenue', value: 'welcomechannel' },
                            { name: 'Auto-Rôle', value: 'welcomerole' },
                            { name: 'Channel de départ', value: 'leavechannel' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('customvoice')
                .setDescription('Configure le systéme de bienvenue')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ticketpanel')
                .setDescription('Inisialise le systéme de ticket')
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        const perms = await client.checkUserPerms({
            flags: [Discord.PermissionsBitField.Flags.Administrator],
            perms: [Discord.PermissionsBitField.Flags.Administrator]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};

 