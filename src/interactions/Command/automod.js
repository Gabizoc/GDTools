const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('automod')
        .setDescription('Gére l auto-modération')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Donne des information sur la commande')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('antiinvite')
                .setDescription('Activé / Désactivé l anti-invite')
                .addBooleanOption(option => option.setName('active').setDescription('Séléctione un état').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('antilinks')
                .setDescription('Activé / Désactivé l anti-lien')
                .addBooleanOption(option => option.setName('active').setDescription('Séléctione un état').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('antispam')
                .setDescription('Activé / Désactivé l anti-spam')
                .addBooleanOption(option => option.setName('active').setDescription('Séléctione un état').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('linkschannel')
                .setDescription('Ajout un channel où l on peut envoyer des liens')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Que veux-tu fait avec le channel ?')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Ajouter', value: 'add' },
                            { name: 'Enlevé', value: 'remove' }
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('Séléctionne un channel').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommandGroup(group =>
            group
                .setName('blacklist')
                .setDescription('Gére la liste noir')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('display')
                        .setDescription('Afficher toute la liste noir')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('add')
                        .setDescription('Ajoute un mot à la liste noir')
                        .addStringOption(option => option.setName('word').setDescription('The word for the blacklist').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('remove')
                        .setDescription('Suppime un mot de la liste noir')
                        .addStringOption(option => option.setName('word').setDescription('The word for the blacklist').setRequired(true))
                )
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
            flags: [Discord.PermissionsBitField.Flags.ManageMessages],
            perms: [Discord.PermissionsBitField.Flags.ManageMessages]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};

 