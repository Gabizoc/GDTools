const Discord = require('discord.js');

const Schema = require("../../database/models/levelRewards");

module.exports = async (client, interaction, args) => {
    let level = interaction.options.getNumber('level');

    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;
    
    Schema.findOne({ Guild: interaction.guild.id, Level: level }, async (err, data) => {
        if (data) {
            Schema.findOneAndDelete({ Guild: interaction.guild.id, Level: level }).then(() => {
                client.succNormal({
                    text: `Récompense de niveau supprimé !`,
                    fields: [
                        {
                            name: "🆙┆Niveau :",
                            value: `${level}`,
                            inline: true,
                        }
                    ],
                    type: 'editreply'
                }, interaction);
            })
        }
        else {
            return client.errNormal({
                error: "Pas de récompense trouvé pour ce niveau",
                type: 'editreply'
            }, interaction);
        }
    })
}

 