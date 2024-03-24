const { CommandInteraction, Client } = require('discord.js');
const { ContextMenuCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const model = require('../../database/models/badge');
const Schema = require('../../database/models/profile');
const CreditsSchema = require("../../database/models/votecredits");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Bot profile')
        .setType(2),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const badgeFlags = {
            DEVELOPER: client.emotes.badges.developer,
            EVENT: client.emotes.badges.event,
            BOOSTER: client.emotes.badges.booster,
            BUGS: client.emotes.badges.bug,
            MANAGEMENT: client.emotes.badges.management,
            PREMIUM: client.emotes.badges.premium,
            SUPPORTER: client.emotes.badges.supporter,
            TEAM: client.emotes.badges.team,
            BOOSTER: client.emotes.badges.booster,
            PARTNER: client.emotes.badges.partner,
            VOTER: client.emotes.badges.voter,
            SUPPORT: client.emotes.badges.support,
            MODERATOR: client.emotes.badges.moderator,
            DESIGNER: client.emotes.badges.designer,
            MARKETING: client.emotes.badges.marketing,
            ACTIVE: client.emotes.badges.active,
            VIP: client.emotes.badges.vip
        }

        const flags = {
            ActiveDeveloper: "・Active Developer",
            BugHunterLevel1: "<:discord_bughunterlv1:1220061227032772751>・Discord Bug Hunter",
            BugHunterLevel2: "<:discord_bughunterlv2:1220061412253106216>・Discord Bug Hunter",
            CertifiedModerator: "👮‍♂️・Certified Moderator",
            HypeSquadOnlineHouse1: "<:discord_bravery:1220061783780495390>・House Bravery Member",
            HypeSquadOnlineHouse2: "<:discord_brillance:1220061695582408875>・House Brilliance Member",
            HypeSquadOnlineHouse3: "<:discord_balance:1220061939926040626>・House Balance Member",
            HypeSquadEvents: "<:discord_hypesquad:1220062062454112337>・HypeSquad Events",
            PremiumEarlySupporter: "👑・Early Supporter",
            Partner: "<:discord_partner:1220062153667514388>・Partner",
            Quarantined: "🔒・Quarantined", // Not sure if this is still a thing
            Spammer: "🔒・Spammer", // Not sure if this one works
            Staff: "<:discord_staff:1220061516133302472>・Discord Staff",
            TeamPseudoUser: "<:discord_staff:1220061516133302472>・Discord Team",
            VerifiedBot: "<:BotTag:1220062351244525619>・Verified Bot",
            VerifiedDeveloper: "<:discord_earlysupporter:1220062519314616321>・(early)Verified Bot Developer",
        }


        const user = interaction.guild.members.cache.get(interaction.targetId);

        Schema.findOne({ User: user.id }, async (err, data) => {
            if (data) {
                await interaction.deferReply({ fetchReply: true });
                let Badges = await model.findOne({ User: user.id });

                let credits = 0;
                const creditData = await CreditsSchema.findOne({ User: user.id });

                if (Badges && Badges.FLAGS.includes("DEVELOPER")) {
                    credits = "∞";
                }
                else if (creditData) {
                    credits = creditData.Credits;
                }

                if (!Badges) Badges = { User: user.id };

                const userFlags = user.flags ? user.flags.toArray() : [];

                client.embed({
                    title: `${client.user.username}・Profile`,
                    desc: '_____',
                    thumbnail: user.avatarURL({ dynamic: true }),
                    fields: [{
                        name: "👤┆Nom",
                        value: user.username,
                        inline: true
                    },
                    {
                        name: "📘┆Discriminator",
                        value: user.discriminator,
                        inline: true
                    },
                    {
                        name: "🆔┆ID",
                        value: user.id,
                        inline: true
                    },
                    {
                        name: "👨‍👩‍👦┆Genre",
                        value: `${data.Gender || 'Non spécifier'}`,
                        inline: true
                    },
                    {
                        name: "🔢┆Age",
                        value: `${data.Age || 'Non spécifier'}`,
                        inline: true
                    },
                    {
                        name: "🎂┆Aniverssaire",
                        value: `${data.Birthday || 'Non spécifier'}`,
                        inline: true
                    },
                    {
                        name: "🎨┆Couleur Préférer",
                        value: `${data.Color || 'Non spécifier'}`,
                        inline: true
                    },
                    {
                        name: "🐶┆Animal Préférer",
                        value: `${data.Pets.join(', ') || 'Non spécifier'}`,
                        inline: true
                    },
                    {
                        name: "🍕┆Aliment Préférer",
                        value: `${data.Food.join(', ') || 'Non spécifier'}`,
                        inline: true
                    },
                    {
                        name: "🎶┆Musique Préférer",
                        value: `${data.Songs.join(', ') || 'Non spécifier'}`,
                        inline: true
                    },
                    {
                        name: "🎤┆Artiste Préférer",
                        value: `${data.Artists.join(', ') || 'Non spécifier'}`,
                        inline: true
                    },
                    {
                        name: "🎬┆Film Préférer",
                        value: `${data.Movies.join(', ') || 'Non spécifier'}`,
                        inline: true
                    },
                    {
                        name: "👨‍🎤┆Acteur Préférer",
                        value: `${data.Actors.join(', ') || 'Non spécifier'}`,
                        inline: true
                    },
                    {
                        name: "🏴┆Origine",
                        value: `${data.Orgin || 'Non spécifier'}`,
                        inline: true
                    },
                    {
                        name: "🎮┆Hobby",
                        value: `${data.Hobbys.join(', ') || 'Non spécifier'}`,
                        inline: true
                    },
                    {
                        name: "😛┆Status",
                        value: `${data.Status || 'Non spécifier'}`,
                        inline: true
                    },
                    {
                        name: "📛┆Badge",
                        value: `${Badges.FLAGS ? Badges.FLAGS.map(flag => badgeFlags[flag]).join(' ') : 'Auccun'}`,
                        inline: true
                    },
                    {
                        name: "🏷️┆Discord Badges",
                        value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None' || 'Auccun'}`,
                        inline: true
                    },
                    {
                        name: "💳┆Dcredits",
                        value: `${credits || 'Auccun'}`,
                        inline: true
                    },
                    {
                        name: "ℹ️┆A propos",
                        value: `${data.Aboutme || 'Non spécifier'}`,
                        inline: false
                    },], type: 'editreply'
                }, interaction);
            }
            else {
                return client.errNormal({ error: "Pas de profil trouver ! Ouvre un profil avec la commande /profil create", type: 'ephemeral' }, interaction);
            }
        })
    },
};

 