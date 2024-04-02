const Discord = require('discord.js');
const axios = require("axios");

const model = require('../../database/models/badge');

module.exports = async (client, interaction, args) => {
  const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
  if(!member) return client.errNormal({
    error: "Cette utilisateur n'est pas dans le serveur :",
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
    ActiveDeveloper: "👨‍💻・Active Developer",
    BugHunterLevel1: "🐛・Discord Bug Hunter",
    BugHunterLevel2: "🐛・Discord Bug Hunter",
    CertifiedModerator: "👮‍♂️・Certified Moderator",
    HypeSquadOnlineHouse1: "🏠・House Bravery Member",
    HypeSquadOnlineHouse2: "🏠・House Brilliance Member",
    HypeSquadOnlineHouse3: "🏠・House Balance Member",
    HypeSquadEvents: "🏠・HypeSquad Events",
    PremiumEarlySupporter: "👑・Early Supporter",
    Partner: "👑・Partner",
    Quarantined: "🔒・Quarantined", // Not sure if this is still a thing
    Spammer: "🔒・Spammer", // Not sure if this one works
    Staff: "👨‍💼・Discord Staff",
    TeamPseudoUser: "👨‍💼・Discord Team",
    VerifiedBot: "🤖・Verified Bot",
    VerifiedDeveloper: "👨‍💻・(early)Verified Bot Developer",
  }

  let Badges = await model.findOne({ User: member.user.id });
  if (!Badges) Badges = { User: member.user.id }
  const roles = member.roles.cache
    .sort((a, b) => b.position - a.position)
    .map(role => role.toString())
    .slice(0, -1);
  const userFlags = member.user.flags ? member.user.flags.toArray() : [];

  return client.embed({
    title: `👤・Information sur le membre`,
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
        name: "TAG :",
        value: `${member.user.discriminator}`,
        inline: true,
      },
      {
        name: "Surnom :",
        value: `${member.nickname || 'No nickname'}`,
        inline: true,
      },
      {
        name: "ID :",
        value: `${member.user.id}`,
        inline: true,
      },
      {
        name: "Drapeaux :",
        value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
        inline: true,
      },
      {
        name: "Badges :",
        value: `${Badges.FLAGS ? Badges.FLAGS.map(flag => badgeFlags[flag]).join(' ') : 'None'}`,
        inline: true,
      },
      {
        name: "Inscrit sur Discord le :",
        value: `<t:${Math.round(member.user.createdTimestamp / 1000)}>`,
        inline: true,
      },
      {
        name: "Rejoint le serveur le :",
        value: `<t:${Math.round(member.joinedAt / 1000)}>`,
        inline: true,
      },
      {
        name: `Roles [${roles.length}] :`,
        value: `${roles.length ? roles.join(', ') : 'Auccun'}`,
        inline: false,
      }
    ],
    type: 'editreply'
  }, interaction)
}

   