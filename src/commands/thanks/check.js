const Discord = require('discord.js');
const thanksSchema = require("../../database/models/thanks");

module.exports = async (client, interaction, args) => {

    const member = interaction.options.getUser('user');

    thanksSchema.findOne({ User: member.id }, async (err, data) => {
        if (data) {

            return client.embed({ title: `🤝・Remerciement`, desc: `**${member.tag}** a \`${data.Received}\` remercié`, type: 'editreply' }, interaction);

        }
        else {

            return client.embed({ title: `🤝・Remerciement`, desc: `**${member.tag}** a \`0\` remerciement`, type: 'editreply' }, interaction);
        }
    });

}

 