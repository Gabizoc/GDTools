const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const perms = await client.checkPerms({
    flags: [Discord.PermissionsBitField.Flags.BanMembers],
    perms: [Discord.PermissionsBitField.Flags.BanMembers]
  }, interaction)

  if (perms == false) return;

  const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);

  member.roles.remove(member.roles.highest.id).then(r => {
    client.embed({
      title: `🔨・Demote`,
      desc: `Tu as bien rétrogradé **${interaction.guild.name}**`,
      fields: [
        {
          name: "👤┆Moderateur :",
          value: interaction.user.tag,
          inline: true
        },
      ]
    }, member).catch(() => { })

    client.succNormal({
      text: `Utilisateur rétrogradé avec succès`, fields: [
        {
          name: "👤┆Membre :",
          value: `${member}`,
          inline: true
        }
      ],
      type: 'editreply'
    }, interaction);
  }).catch(e => {
    client.errNormal({
      error: "Je ne peux pas rétrogradé ce membre",
      type: 'editreply'
    }, interaction)
  });
}

 