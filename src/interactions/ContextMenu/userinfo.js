const { CommandInteraction, Client } = require('discord.js');
const { ContextMenuCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const axios = require("axios");

const model = require('../../database/models/badge');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Userinfo')
        .setType(2),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ ephemeral: false });
        const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
        if (!member) return client.errNormal({
            error: "This user is not in this guild!",
            type: 'editreply'
        }, interaction);
        const badgeFlags = {
            DEVELOPER: client.emotes.badges.developer,
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
            MARKETING: client.emotes.badges.marketing
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

        let Badges = await model.findOne({ User: member.user.id });
        if (!Badges) Badges = { User: member.user.id }
        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);
        const userFlags = member.user.flags ? member.user.flags.toArray() : [];

        return client.embed({
            title: `👤・Info - Utilisateur`,
            desc: `Information about ${member.user.username}`,
            thumbnail: member.user.displayAvatarURL({ dynamic: true, size: 1024 }),
            image: member.user.bannerURL({ dynamic: true, size: 1024 }),
            fields: [
                {
                    name: "Pseudo",
                    value: `${member.user.username}`,
                    inline: true,
                },
                {
                    name: "Discriminator",
                    value: `${member.user.discriminator}`,
                    inline: true,
                },
                {
                    name: "Surnom",
                    value: `${member.nickname || 'No nickname'}`,
                    inline: true,
                },
                {
                    name: "Id",
                    value: `${member.user.id}`,
                    inline: true,
                },
                {
                    name: "Flags",
                    value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
                    inline: true,
                },
                {
                    name: "Badges",
                    value: `${Badges.FLAGS ? Badges.FLAGS.map(flag => badgeFlags[flag]).join(' ') : 'None'}`,
                    inline: true,
                },
                {
                    name: "Compte créer le :",
                    value: `<t:${Math.round(member.user.createdTimestamp / 1000)}>`,
                    inline: true,
                },
                {
                    name: "Rejoint le :",
                    value: `<t:${Math.round(member.joinedAt / 1000)}>`,
                    inline: true,
                },
                {
                    name: `Roles [${roles.length}]`,
                    value: `${roles.length ? roles.join(', ') : 'None'}`,
                    inline: false,
                }
            ],
            type: 'editreply'
        }, interaction)
    },
};

 