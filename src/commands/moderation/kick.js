const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const perms = await client.checkPerms({
    flags: [Discord.PermissionsBitField.Flags.KickMembers],
    perms: [Discord.PermissionsBitField.Flags.KickMembers]
  }, interaction)

  if (perms == false) return;

  const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
  const reason = interaction.options.getString('reason') || 'Non donné';

  if (member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers) || member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) return client.errNormal({
    error: "Tu ne peux pas explusé un modérateur !",
    type: 'editreply'
  }, interaction);

  client.embed({
    title: `🔨・Expultion`,
    desc: `Tu as explusé **${interaction.guild.name}**`,
    fields: [
      {
        name: "👤┆Explusé par :",
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
    member.kick(reason)
    client.succNormal({
      text: "L'utilisateur spécifié a été expulsé avec succès et a reçu un mp !",
      fields: [
        {
          name: "👤┆Explusé par :",
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
    member.kick(reason)
    client.succNormal({
      text: "L'utilisateur spécifié a été expulsé avec succès mais n'a pas reçus de mp !",
      type: 'editreply'
    }, interaction);
  });
}

 