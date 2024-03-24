const Discord = require('discord.js');

module.exports = (client, error) => {
    if (error.message == undefined) {
        console.log(error);
        error.message = "Envoyer à la console";
    }
    const errorlog = new Discord.WebhookClient({
        id: client.webhooks.voiceErrorLogs.id,
        token: client.webhooks.voiceErrorLogs.token,
    });

    let embed = new Discord.EmbedBuilder()
        .setTitle(`🚨・Erreur vocal`)
        .addFields(
            { name: "Erreur", value: `\`\`\`${error.message}\`\`\``},
            { name: `Erreur via la console`, value: `\`\`\`${error.stack.substr(0, 1018)}\`\`\``},
        )
        .setColor(client.config.colors.normal)
    errorlog.send({
        username: `Bot errors`,
        embeds: [embed],

    }).catch(error => { console.log(error) })
};