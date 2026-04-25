// filepath: commands/ping.js
const { SlashCommandBuilder } = require("discord.js");
const embed = require("../utils/embed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check bot latency"),

  async execute(interaction, client) {
    const latency = Date.now() - interaction.createdTimestamp;

    await interaction.reply({
      embeds: [embed.ping(latency)],
    });
  },
};
