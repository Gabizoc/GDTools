const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");
const ticketChannels = require("../../database/models/ticketChannels");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data) {
            const ticketCategory = interaction.guild.channels.cache.get(data.Category);
            const ticketRole = interaction.guild.roles.cache.get(data.Role);

            if (ticketCategory == undefined) {
                return client.errNormal({
                    error: "Active le systéme de ticket d'abord!",
                    type: 'editreply'
                }, interaction);
            }

            if (interaction.channel.parentId == ticketCategory.id) {

                try {
                    interaction.channel.permissionOverwrites.edit(ticketRole, {
                        ViewChannel: false,
                        SendMessages: false,
                        AttachFiles: false,
                        ReadMessageHistory: false,
                        AddReactions: false
                    });

                    return client.simpleEmbed({
                        desc: `Ticket élevé par <@!${interaction.user.id}>`,
                        type: 'editreply'
                    }, interaction)
                }
                catch {
                    client.errNormal({
                        error: "Une erreur est surevenu",
                        type: 'editreply'
                    }, interaction);
                }

            }
            else {
                client.errNormal({
                    error: "Ce n'est pas un ticket !",
                    type: 'editreply'
                }, interaction);

            }
        }
        else {
            return client.errNormal({
                error: "Active le systéme de ticket d'abord!",
                type: 'editreply'
            }, interaction);
        }
    })
}

 