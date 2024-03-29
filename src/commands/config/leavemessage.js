const Discord = require('discord.js');

const inviteMessages = require("../../database/models/inviteMessages");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const message = interaction.options.getString('message');

    if (message.toUpperCase() == "HELP") {
        return client.embed({
            title: `ℹ️・Option de message d'au-revoir :`,
            desc: `Options : \n
            \`{user:username}\` - Nom du membre
            \`{user:discriminator}\` - Surnom du membre
            \`{user:tag}\` - TAG du membre
            \`{user:mention}\` - Mention du membre

            \`{inviter:username}\` - Nom de l'inviteur
            \`{inviter:discriminator}\` - Surnom de l'inviteur
            \`{inviter:tag}\` - TAG de l'inviteur
            \`{inviter:mention}\` - Mention de l'inviteur
            \`{inviter:invites}\` - Nombre d'invitation de l'inviteur
            \`{inviter:invites:left}\` - Nombre d'invitation quitter de l'inviteur
            
            \`{guild:name}\` - Nom du serveur
            \`{guild:members}\` - Compteur de membre`,
            type: 'editreply'
        }, interaction)
    }

    if (message.toUpperCase() == "DEFAULT") {
        inviteMessages.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.inviteLeave = null;
                data.save();

                client.succNormal({
                    text: `Message d'au-revoir supprimer`,
                    type: 'editreply'
                }, interaction);
            }
        })
    }
    else {
        inviteMessages.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.inviteLeave = message;
                data.save();
            }
            else {
                new inviteMessages({
                    Guild: interaction.guild.id,
                    inviteLeave: message
                }).save();
            }

            client.succNormal({
                text: `Le message d'au-revoir à bien été configurer`,
                fields: [
                    {
                        name: `💬┆Message`,
                        value: `${message}`,
                        inline: true
                    },
                ],
                type: 'editreply'
            }, interaction)
        })
    }
}

 