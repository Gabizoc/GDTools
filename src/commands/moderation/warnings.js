const Discord = require('discord.js');

const Schema = require("../../database/models/warnings");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction);

    if (perms == false) {
        client.errNormal({
            error: "Tu n'as pas la permission nécessaire pour executer cette commande",
            type: 'editreply'
        }, interaction);
        return;
    }

    const member = interaction.options.getUser('user');


    Schema.findOne({ Guild: interaction.guild.id, User: member.id }, async (err, data) => {
        if (data) {
            var fields = [];
            data.Warnings.forEach(element => {
                fields.push({
                    name: "Avertissement **" + element.Case + "**",
                    value: "Réson: " + element.Reason + "\nModerateur <@!" + element.Moderator + ">",
                    inline: true
                })
            });
            client.embed({
                title: `${client.emotes.normal.error}・Avertissements`,
                desc: `Avertissement de **${member.tag}**`,
                fields: [
                    {
                        name: "Totals :",
                        value: `${data.Warnings.length}`,
                    },
                    ...fields
                ],
                type: 'editreply'
            }, interaction)
        }
        else {
            client.embed({
                title: `${client.emotes.normal.error}・Avertissements`,
                desc: `L'utilisateur ${member.user.tag} n'a pas d'avertissement !`,
                type: 'editreply'
            }, interaction)
        }
    })
}

