// filepath: commands/reset-ai.js
const { SlashCommandBuilder } = require("discord.js");
const db = require("../database/serverData");
const embed = require("../utils/embed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reset-ai")
    .setDescription("Reset conversation memory"),

  async execute(interaction, client) {
    const guildId = interaction.guild.id;

    // Clear conversation history
    db.clearConversation(guildId);

    // Get language for response
    const language = db.getLanguage(guildId);
    const message =
      language === "km"
        ? "ប្រវត្តិនៃការជជែកត្រូវបានកែសម្រួលដោយជោគជ័យ!"
        : "Conversation memory has been reset successfully!";

    await interaction.reply({
      embeds: [embed.success("Reset Complete", message)],
    });

    console.log(`✅ Conversation reset in ${interaction.guild.name}`);
  },
};
