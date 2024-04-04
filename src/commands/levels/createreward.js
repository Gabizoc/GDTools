const Discord = require('discord.js');

const Schema = require("../../database/models/levelRewards");

module.exports = async (client, interaction, args) => {
    let level = interaction.options.getNumber('level');
    let role = interaction.options.getRole('role');

    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    Schema.findOne({ Guild: interaction.guild.id, Level: level }, async (err, data) => {
        if (data) {
            return client.errNormal({ 
                error: "Ce niveau a déjà une récompense !",
                type: 'editreply'
            }, interaction);
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                Level: level,
                Role: role.id
            }).save();

            client.succNormal({ 
                text: `Récompense de niveaux créer !`,
                fields: [
                    {
                        name: "📘┆Rôle :",
                        value: `${role}`,
                        inline: true,
                    }
                ],
                type: 'editreply'
            }, interaction);
        }
    })
}

 