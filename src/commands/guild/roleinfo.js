const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const role = interaction.options.getRole('role');
  const perms = role.permissions.toArray();

  client.embed({
    title: `ℹ️・Role information`,
    thumbnail: interaction.guild.iconURL({ dynamic: true, size: 1024 }),
    desc: `Information sur le rôle : ${role}`,
    fields: [
      {
        name: 'ID du rôle :',
        value: `${role.id}`,
        inline: true
      },
      {
        name: 'Nom du rôle :',
        value: `${role.name}`,
        inline: true
      },
      {
        name: 'Mentionable :',
        value: `${role.mentionable ? 'Oui' : 'Non'}`,
        inline: true
      },
      {
        name: 'Permission du rôle :',
        value: `${perms.join(', ')}`
      }
    ],
    type: 'editreply'
  }, interaction)
}

   