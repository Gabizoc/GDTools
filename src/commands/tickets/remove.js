const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");
const ticketChannels = require("../../database/models/ticketChannels");

module.exports = async (client, interaction, args) => {
    const data = await ticketSchema.findOne({ Guild: interaction.guild.id });
    const ticketData = await ticketChannels.findOne({ Guild: interaction.guild.id, channelID: interaction.channel.id });

    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    if (data) {
        const ticketCategory = interaction.guild.channels.cache.get(data.Category);
        if (ticketCategory == undefined) {
            return client.errNormal({
                error: "Active le systéme de ticket d'abord!",
                type: 'editreply'
            }, interaction)
        }

        if (interaction.channel.parentId == ticketCategory.id) {
            let user = interaction.options.getUser('user');
            if (ticketData && user.id == ticketData.creator) {
                return client.errNormal({ 
                    error: "Vous ne pouvez pas supprimer le créateur de ce ticket", 
                    type: 'ephemeraledit' 
                }, interaction)
            }

            interaction.channel.permissionOverwrites.edit(user.id, { ViewChannel: false, SendMessages: false });

            return client.simpleEmbed({
                desc: `Suppression de ${user}`,
                type: 'editreply'
            }, interaction)
        }
        else {
            client.errNormal({ 
                error: "Ce n'est pas un ticket !", 
                type: 'editreply' 
            }, interaction)
        }
    }
}

 