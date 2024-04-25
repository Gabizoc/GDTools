const Discord = require('discord.js');
const { REST } = require('discord.js');
const { Routes } = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');

module.exports = (client) => {
    const interactionLogs = new Discord.WebhookClient({
        id: client.webhooks.interactionLogs.id,
        token: client.webhooks.interactionLogs.token,
    });

    const commands = [];

    if (client.shard.ids[0] === 0) console.log(chalk.blue(chalk.bold(`Systéme`)), (chalk.white(`>>`)), (chalk.green(`Chargement des commandes ...`)), (chalk.white(`...`)))
    if (client.shard.ids[0] === 0) console.log(`\u001b[0m`);

    fs.readdirSync('./src/interactions').forEach(dirs => {
        const commandFiles = fs.readdirSync(`./src/interactions/${dirs}`).filter(files => files.endsWith('.js'));

        if (client.shard.ids[0] === 0) console.log(chalk.blue(chalk.bold(`Systéme`)), (chalk.white(`>>`)), chalk.red(`${commandFiles.length}`), (chalk.green(`commandes de`)), chalk.red(`${dirs}`), (chalk.green(`chargé`)));

        for (const file of commandFiles) {
            const command = require(`${process.cwd()}/src/interactions/${dirs}/${file}`);
            client.commands.set(command.data.name, command);
            commands.push(command.data);
        };
    });

    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

    (async () => {
        try {
            const embed = new Discord.EmbedBuilder()
                .setDescription(`Lancement de l'actualisation des commandes de l'application (/).`)
                .setColor(client.config.colors.normal)
            interactionLogs.send({
                username: 'Bot Logs',
                embeds: [embed]
            });

            await rest.put(
                Routes.applicationCommands(client.config.discord.id),
                { body: commands },
            )

            const embedFinal = new Discord.EmbedBuilder()
                .setDescription(`Commandes d'application (/) ${commands.length} rechargées avec succès.`)
                .setColor(client.config.colors.normal)
            interactionLogs.send({
                username: 'Bot Logs',
                embeds: [embedFinal]
            });

        } catch (error) {
            console.log(error);
        }
    })();
}

 