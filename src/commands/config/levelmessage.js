const Discord = require('discord.js');

const Schema = require("../../database/models/levelMessages");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const message = interaction.options.getString('message');

    if (message.toUpperCase() == "HELP") {
        return client.embed({
            title: `ℹ️・Message de level`,
            desc: `Message de niveau : \n
            \`{user:username}\` - Nom du membre
            \`{user:discriminator}\` - Surnom du membre
            \`{user:tag}\` - TAG du membre
            \`{user:mention}\` - Mention du membre

            \`{user:level}\` - Level du membre
            \`{user:xp}\` - XP du membre`,
            type: 'editreply'
        }, interaction)
    }

    if (message.toUpperCase() == "DEFAULT") {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                Schema.findOneAndDelete({ Guild: interaction.guild.id }).then(() => {
                    client.succNormal({ 
                        text: `Message de niveau supprimer`,
                        type: 'editreply'
                    }, interaction);
                })
            }
        })
    }
    else {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.Message = message;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    Message: message
                }).save();
            }

            client.succNormal({
                text: `Le message de niveau a bien été configurer !`,
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

 