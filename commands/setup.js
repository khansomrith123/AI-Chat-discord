// filepath: commands/setup.js
const { SlashCommandBuilder } = require("discord.js");
const db = require("../database/serverData");
const embed = require("../utils/embed");
const webhook = require("../utils/webhook");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Set the AI chat channel (Admin only)")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Select the channel for AI chat")
        .setRequired(true),
    ),

  async execute(interaction, client) {
    // Check if user has administrator permission
    if (!interaction.member.permissions.has("Administrator")) {
      return interaction.reply({
        embeds: [
          embed.error(
            "Permission Denied",
            "You need Administrator permission to use this command.",
          ),
        ],
        ephemeral: true,
      });
    }

    const channel = interaction.options.getChannel("channel");
    const guildId = interaction.guild.id;

    // Save the channel ID to database
    db.setAIChannel(guildId, channel.id);

    // Log setup to webhook
    await webhook.logSetup(interaction, channel);

    // Reply with success embed
    await interaction.reply({
      embeds: [embed.setup(`#${channel.name}`)],
    });

    console.log(
      `✅ AI Channel set to #${channel.name} (${channel.id}) in ${interaction.guild.name}`,
    );
  },
};
