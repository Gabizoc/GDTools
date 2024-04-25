const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");
const ticketChannels = require("../../database/models/ticketChannels");

module.exports = async (client, interaction, args) => {
    const data = await ticketSchema.findOne({ Guild: interaction.guild.id });
    const ticketData = await ticketChannels.findOne({ Guild: interaction.guild.id, channelID: interaction.channel.id })

    let type = 'reply';
    if (interaction.isCommand()) type = 'editreply';
    
    if (ticketData) {
        if (interaction.user.id !== ticketData.creator) {
            const perms = await client.checkUserPerms({
                flags: [Discord.PermissionsBitField.Flags.ManageMessages],
                perms: [Discord.PermissionsBitField.Flags.ManageMessages]
            }, interaction)

            if (perms == false) return;

            if (data) {
                if (ticketData.claimed == "" || ticketData.claimed == undefined || ticketData.claimed == "None") {
                    const ticketCategory = interaction.guild.channels.cache.get(data.Category);

                    if (ticketCategory == undefined) {
                        return client.errNormal({
                            error: "Active le systéme de ticket d'abord!",
                            type: type
                        }, interaction)
                    }

                    if (interaction.channel.parentId == ticketCategory.id) {

                        ticketData.claimed = interaction.user.id;
                        ticketData.save();

                        return client.simpleEmbed({
                            desc: `<@!${interaction.user.id}> va s'occuper de toi`,
                            type: type
                        }, interaction)

                    }
                    else {
                        client.errNormal({
                            error: "Ce n'est pas un ticket !",
                            type: type
                        }, interaction)
                    }
                }
                else {
                    client.errNormal({
                        error: "Quelqu'un gére déjà ce ticket !",
                        type: 'ephemeral'
                    }, interaction)
                }
            }
            else {
                return client.errNormal({
                    error: "Active le systéme de ticket d'abord!",
                    type: type
                }, interaction)
            }
        }
        else {
            return client.errNormal({
                error: "Tu ne peux pas géré ton propre ticket",
                type: 'ephemeral'
            }, interaction)
        }
    }
}

 