const Discord = require('discord.js');

const Schema = require("../../database/models/reactionRoles");

module.exports = async (client, interaction, args) => {
    const category = interaction.options.getString('category');
    const channel = interaction.options.getChannel('channel') || interaction.channel;

    const lower = category.toLowerCase();
    const upper = lower.charAt(0).toUpperCase() + lower.substring(1);

    Schema.findOne({ Guild: interaction.guild.id, Category: category }, async (err, data) => {
        if (!data) return client.errNormal({ 
            error: `Pas de donné trouvé !`,
            type: 'editreply'
        }, interaction);

        const map = Object.keys(data.Roles)
            .map((value, index) => {
                const role = interaction.guild.roles.cache.get(data.Roles[value][0]);
                if(!role) return;

                return `${data.Roles[value][1].raw} | ${role}`;
            }).join("\n");

        const menu = new Discord.StringSelectMenuBuilder()
            .setCustomId('reaction_select')
            .setPlaceholder('❌┇Rien séléctioné')
            .setMinValues(1)

        var labels = [];

        const mapped = Object.keys(data.Roles).map((value, index) => {
            const role = interaction.guild.roles.cache.get(data.Roles[value][0]);
            if(!role) return;

            const generated = {
                label: `${role.name}`,
                description: `Add or remove the role ${role.name}`,
                emoji: data.Roles[value][1].raw,
                value: data.Roles[value][1].raw,
            }

            return labels.push(generated);
        }).join("\n");

        await menu.addOptions(labels);

        const row = new Discord.ActionRowBuilder()
            .addComponents(menu)

        client.embed({
            title: `${upper}・Rôles`,
            desc: `_____ \n\nPrenez vos rôles ici \n\n${map}`,
            components: [row]
        }, channel).then(async(msg) => {
            if(!msg){
                client.errNormal({
                    error: "Impossible d'envoyé le message !\nIl me faut les bonnes permissions !",
                    type: 'editreply'
                }, interaction);
                return;
            }
            data.Message = msg.id;
            data.save();
        })

        client.succNormal({ 
            text: "Panel bien généré !",
            type: 'ephemeraledit'
        }, interaction);
    })
}

 