const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  let verifLevels = {
    "0": "Non",
    "1": "Faible",
    "2": "Modéré",
    "3": "(╯°□°）╯︵  ┻━┻",
    "4": "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"
  }

  let region = {
    "brazil": `:flag_br: `,
    "eu-central": `:flag_eu: `,
    "singapore": `:flag_sg: `,
    "us-central": `:flag_us: `,
    "sydney": `:flag_au: `,
    "us-east": `:flag_us: `,
    "us-south": `:flag_us: `,
    "us-west": `:flag_us: `,
    "eu-west": `:flag_eu: `,
    "vip-us-east": `:flag_us: `,
    "europe": `:flag_gb:`,
    "amsterdam": `:flag_nl:`,
    "hongkong": `:flag_hk: `,
    "russia": `:flag_ru: `,
    "southafrica": `:flag_za: `
  }

  let tier = {
     "0": "Non",
    "1": "TIER 1",
    "2": "TIER 2",
    "3": "**TIER 3**"
  }

  const members = await interaction.guild.members.fetch();

  client.embed({
    title: `ℹ️・Server Information`,
    desc: `Information sur le serveur : ${interaction.guild.name}`,
    thumbnail: interaction.guild.iconURL({ dynamic: true, size: 1024 }),
    image: interaction.guild.bannerURL({ size: 1024 }),
    fields: [
      {
        name: "Nom du serveur :",
        value: `${interaction.guild.name}`,
        inline: true,
      },
      {
        name: "ID du serveur :",
        value: `${interaction.guild.id}`,
        inline: true,
      },
      {
        name: "Créateur :",
        value: `<@!${interaction.guild.ownerId}>`,
        inline: true
      },
      {
        name: "Niveau de vérification :",
        value: `${verifLevels[interaction.guild.verificationLevel]}`,
        inline: true
      },
      {
        name: "Niveau de Boost :",
        value: `${tier[interaction.guild.premiumTier]}`,
        inline: true
      },
      {
        name: "Nombre de Boost :",
        value: `${interaction.guild.premiumSubscriptionCount || '0'} boost`,
        inline: true
      },
      {
        name: "Créer le :",
        value: `<t:${Math.round(interaction.guild.createdTimestamp / 1000)}>`,
        inline: true
      },
      {
        name: "Membres :",
        value: `${interaction.guild.memberCount} membres!`,
        inline: true
      },
      {
        name: "Bots :",
        value: `${members.filter(member => member.user.bot).size} bots!`,
        inline: true
      },
      {
        name: "Channel de texte",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildText).size} channels!`,
        inline: true
      },
      {
        name: "Vocals :",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type ===  Discord.ChannelType.GuildVoice).size} channels!`,
        inline: true
      },
      {
        name: "Channel de donférence :",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type ===  Discord.ChannelType.GuildStageVoice).size} channels!`,
        inline: true
      },
      {
        name: "Channel d'annonces :",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type ===  Discord.ChannelType.GuildAnnouncement).size} channels!`,
        inline: true
      },
      {
        name: "Fils publiques :",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_PUBLIC_THREAD').size} fils !`,
        inline: true
      },
      {
        name: "Fils privés :",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_PRIVATE_THREAD').size} fils !`,
        inline: true
      },
      {
        name: "Rôles :",
        value: `${interaction.guild.roles.cache.size} roles!`,
        inline: true
      },
      {
        name: "Nombre d'émojis :",
        value: `${interaction.guild.emojis.cache.size} emoji's`,
        inline: true
      },
      {
        name: "Nombre de stickers :",
        value: `${interaction.guild.stickers.cache.size} stickers`,
        inline: true
      }
    ],
    type: 'editreply'
  }, interaction)
}

   
