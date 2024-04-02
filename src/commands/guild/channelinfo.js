const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const channel = interaction.options.getChannel('channel');

  client.embed({
      title: `ℹ・Channel information`,
      desc: `Information sur le channel : <#${channel.id}>`,
      fields: [
          {
              name: "Type :",
              value: `${channel.type}`,
              inline: true,
          },
          {
              name: "ID :",
              value: `${channel.id}`,
              inline: true,
          },
          {
              name: "Créer le :",
              value: `${channel.createdAt}`,
              inline: true,
          },
          {
              name: "Sujet :",
              value: `${channel.topic ? channel.topic : 'N/A'}`,
              inline: true,
          },
          {
              name: "NSFW :",
              value: `${channel.nsfw}`,
              inline: true,
          },
          {
              name: "Catégorie :",
              value: `${channel.parentID ? channel.parentID : 'N/A'}`,
              inline: true,
          },
      ],
      type: 'editreply'
  }, interaction)
}

   