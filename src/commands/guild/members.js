const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const members = await interaction.guild.members.fetch();

  client.embed({
    title: `👤・Nombres de membres`,
    desc: `Vois le nombres de membres sur le serveur`,
    fields: [
      {
        name: `👤┆Membres :`,
        value: `${members.filter(member => !member.user.bot).size} membres`,
        inline: true
      },
      {
        name: `🤖┆Bots :`,
        value: `${members.filter(member => member.user.bot).size} bots`,
        inline: true
      },
      {
        name: `📘┆Total :`,
        value: `${interaction.guild.memberCount} membres`,
        inline: true
      }
    ],
    type: 'editreply'
  }, interaction)
}

   