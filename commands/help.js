// filepath: commands/help.js
const { SlashCommandBuilder } = require("discord.js");
const embed = require("../utils/embed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show bot commands"),

  async execute(interaction, client) {
    await interaction.reply({
      embeds: [embed.help()],
    });
  },
};
