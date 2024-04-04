const Discord = require('discord.js');

const Schema = require("../../database/models/invites");

module.exports = async (client, interaction, args) => {
    let user = interaction.options.getUser('user') || interaction.user;

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (data) {
            client.embed({
                title: "📨・Invites",
                desc: `**${user.tag}** a \`${data.Invites}\` invites`,
                fields: [
                    {
                        name: "Total",
                        value: `${data.Total}`,
                        inline: true
                    },
                    {
                        name: "Partie",
                        value: `${data.Left}`,
                        inline: true
                    }
                ],
                type: 'editreply'
            }, interaction)
        }
        else {
            client.embed({
                title: "📨・Invites",
                desc: `**${user.tag}** a \`0\` invites`,
                fields: [
                    {
                        name: "Total",
                        value: `0`,
                        inline: true
                    },
                    {
                        name: "Partie",
                        value: `0`,
                        inline: true
                    }
                ],
                type: 'editreply'
            }, interaction)
        }
    });
}

 