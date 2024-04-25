const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const perms = await client.checkPerms({
    flags: [Discord.PermissionsBitField.Flags.BanMembers],
    perms: [Discord.PermissionsBitField.Flags.BanMembers]
  }, interaction)

  if (perms == false) return;

  const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
  const reason = interaction.options.getString('reason') || 'Non donné';

  if (member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers) || member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) return client.errNormal({
    error: "Tu ne peux pas ban un modérateur !",
    type: 'editreply'
  }, interaction);

  client.embed({
    title: `🔨・Ban`,
    desc: `Tu as été banni par **${interaction.guild.name}**`,
    fields: [
      {
        name: "👤┆Banni par :",
        value: interaction.user.tag,
        inline: true
      },
      {
        name: "💬┆Réson :",
        value: reason,
        inline: true
      }
    ]
  }, member).then(function () {
    member.ban({ reason: reason })
    client.succNormal({
      text: "Le membre a bien été banni et a reçus un mp",
      fields: [
        {
          name: "👤┆Membre banni :",
          value: member.user.tag,
          inline: true
        },
        {
          name: "💬┆Réson :",
          value: reason,
          inline: true
        }
      ],
      type: 'editreply'
    }, interaction);
  }).catch(function () {
    member.ban({ reason: reason })
    client.succNormal({
      text: "Le membre a bien été banni mais n'a pas reçus de mp",
      type: 'editreply'
    }, interaction);
  });
}

 