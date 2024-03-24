const Discord = require('discord.js');
const chalk = require('chalk');
require('dotenv').config('./.env');
const axios = require('axios');
// Check if is up to date
const { version } = require('.././package.json');
axios.get('https://api.github.com/repos/CorwinDev/Discord-Bot/releases/latest').then(res => {
    if (res.data.tag_name !== version) {
        console.log(chalk.red.bgYellow(`Your bot is not up to date! Please update to the latest version!`, version + ' -> ' + res.data.tag_name));
    }
}).catch(err => {
    console.log(chalk.red.bgYellow(`Failed to check if bot is up to date!`));
});


const webhook = require("./config/webhooks.json");
const config = require("./config/bot.js");
const webHooksArray = ['startLogs', 'shardLogs', 'errorLogs', 'dmLogs', 'voiceLogs', 'serverLogs', 'serverLogs2', 'commandLogs', 'consoleLogs', 'warnLogs', 'voiceErrorLogs', 'creditLogs', 'evalLogs', 'interactionLogs'];
// Check if .env webhook_id and webhook_token are set
if (process.env.WEBHOOK_ID && process.env.WEBHOOK_TOKEN) {
    for (const webhookName of webHooksArray) {
        webhook[webhookName].id = process.env.WEBHOOK_ID;
        webhook[webhookName].token = process.env.WEBHOOK_TOKEN;
    }
}


const startLogs = new Discord.WebhookClient({
    id: webhook.startLogs.id,
    token: webhook.startLogs.token,
});

const shardLogs = new Discord.WebhookClient({
    id: webhook.shardLogs.id,
    token: webhook.shardLogs.token,
});

const manager = new Discord.ShardingManager('./src/bot.js', {
    totalShards: 'auto',
    token: process.env.DISCORD_TOKEN,
    respawn: true
});
if (process.env.TOPGG_TOKEN) {
    const { AutoPoster } = require('topgg-autoposter');
    AutoPoster(process.env.TOPGG_TOKEN, manager);
}
console.clear();
console.log(chalk.blue(chalk.bold(`Bot Systéme`)), (chalk.white(`>>`)), (chalk.green(`Démarage`)), (chalk.white(`...`)))
console.log(chalk.blue(chalk.bold(`Bot Systéme`)), (chalk.white(`>>`)), chalk.red(`Version ${require(`${process.cwd()}/package.json`).version}`), (chalk.green(`charger`)))
console.log(`\u001b[0m`);

manager.on('shardCreate', shard => {
    let embed = new Discord.EmbedBuilder()
        .setTitle(`🆙・Démarage`)
        .setDescription(`Le bot est en démarage ...`)
        .setFields([
            {
                name: `📃┆Statut`,
                value: `Lancement...`,
                inline: true
            }
        ])
        .setColor(config.colors.normal)
    startLogs.send({
        username: 'Bot Logs',
        embeds: [embed],
    });

    console.log(chalk.blue(chalk.bold(`Systéme`)), (chalk.white(`>>`)), (chalk.green(`Démarage`)), (chalk.white(`...`)))
    console.log(`\u001b[0m`);

    shard.on("death", (process) => {
        const embed = new Discord.EmbedBuilder()
            .setTitle(`🚨・Le bot s'est arrété !`)
            .setColor(config.colors.normal)
        shardLogs.send({
            username: 'Bot Logs',
            embeds: [embed]
        });

        if (process.exitCode === null) {
            const embed = new Discord.EmbedBuilder()
                .setTitle(`🚨・Le serveur s'est arrété avec un code null`)
                .setFields([
                    {
                        name: "PID",
                        value: `\`${process.pid}\``,
                    },
                    {
                        name: "Code de sortie",
                        value: `\`${process.exitCode}\``,
                    }
                ])
                .setColor(config.colors.normal)
            shardLogs.send({
                username: 'Bot Logs',
                embeds: [embed]
            });
        }
    });

    shard.on("shardDisconnect", (event) => {
        const embed = new Discord.EmbedBuilder()
            .setTitle(`🚨・Serveur déconnecter`)
            .setDescription("Le serveur s'est déconnecté brutalement")
            .setColor(config.colors.normal)
        shardLogs.send({
            username: 'Bot Logs',
            embeds: [embed],
        });
    });

    shard.on("shardReconnecting", () => {
        const embed = new Discord.EmbedBuilder()
            .setTitle(`🚨・Reconexion au serveur`)
            .setColor(config.colors.normal)
        shardLogs.send({
            username: 'Bot Logs',
            embeds: [embed],
        });
    });
});


manager.spawn();


// Webhooks
const consoleLogs = new Discord.WebhookClient({
    id: webhook.consoleLogs.id,
    token: webhook.consoleLogs.token,
});

const warnLogs = new Discord.WebhookClient({
    id: webhook.warnLogs.id,
    token: webhook.warnLogs.token,
});

process.on('unhandledRejection', error => {
    console.error('Erreur', error);
    if (error) if (error.length > 950) error = error.slice(0, 950) + '... regardez la console pour + de détails';
    if (error.stack) if (error.stack.length > 950) error.stack = error.stack.slice(0, 950) + '... regardez la console pour + de détails';
    if (!error.stack) return
    const embed = new Discord.EmbedBuilder()
        .setTitle(`🚨・Erreur`)
        .addFields([
            {
                name: "Erreur",
                value: error ? Discord.codeBlock(error) : "Pas d'erreur",
            },
            {
                name: "Erreur via console",
                value: error.stack ? Discord.codeBlock(error.stack) : "Pas d'erreur via la console",
            }
        ])
    consoleLogs.send({
        username: 'Bot Logs',
        embeds: [embed],
    }).catch(() => {
        console.log('Erreur avec les webhook')
        console.log(error)
    })
});

process.on('warning', warn => {
    console.warn("Warning:", warn);
    const embed = new Discord.EmbedBuilder()
        .setTitle(`🚨・Nouvel avertisement`)
        .addFields([
            {
                name: `Warn`,
                value: `\`\`\`${warn}\`\`\``,
            },
        ])
    warnLogs.send({
        username: 'Bot Logs',
        embeds: [embed],
    }).catch(() => {
        console.log('Erreur envoyer aux webhook')
        console.log(warn)
    })
});