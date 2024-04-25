const Discord = require('discord.js');
const generator = require('generate-password');

const Schema = require("../../database/models/notes");

module.exports = async (client, interaction, args) => {

    let id = interaction.options.getString('id');

    Schema.findOne({ Guild: interaction.guild.id, Code: id }, async (err, data) => {
        if (data) {
            Schema.findOneAndDelete({ Guild: interaction.guild.id, Code: id }).then(() => {
                client.succNormal({ text: `La note **#${id}** a été supprimer`, type: 'editreply' }, interaction);
            })
        }
        else {
            client.errNormal({ error: `Auccun note n'a été trouvé avec l'Id : **#${id}**`, type: 'editreply' }, interaction);
        }
    })
}

 