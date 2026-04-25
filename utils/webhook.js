// filepath: utils/webhook.js
const { WebhookClient, EmbedBuilder } = require("discord.js");

class WebhookLogger {
  constructor() {
    this.webhookClient = null;
    this.init();
  }

  init() {
    const webhookUrl = process.env.WEBHOOK_URL;
    if (
      webhookUrl &&
      webhookUrl.startsWith("https://discord.com/api/webhooks/")
    ) {
      this.webhookClient = new WebhookClient({ url: webhookUrl });
    }
  }

  // Log bot startup
  async logStartup(client) {
    if (!this.webhookClient) return;

    const embed = new EmbedBuilder()
      .setColor("#00CC66")
      .setTitle("🤖 Bot Started")
      .addFields(
        { name: "Bot", value: client.user.tag, inline: true },
        { name: "Servers", value: `${client.guilds.cache.size}`, inline: true },
        {
          name: "Time",
          value: `<t:${Math.floor(Date.now() / 1000)}:F>`,
          inline: false,
        },
      )
      .setTimestamp();

    await this.webhookClient.send({ embeds: [embed] });
  }

  // Log command usage
  async logCommand(interaction) {
    if (!this.webhookClient) return;

    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle("📝 Command Used")
      .addFields(
        { name: "Command", value: `/${interaction.commandName}`, inline: true },
        {
          name: "User",
          value: `${interaction.user.tag} (${interaction.user.id})`,
          inline: true,
        },
        {
          name: "Server",
          value: interaction.guild?.name || "DM",
          inline: true,
        },
        {
          name: "Channel",
          value: interaction.channel?.name || "N/A",
          inline: true,
        },
        {
          name: "Time",
          value: `<t:${Math.floor(Date.now() / 1000)}:F>`,
          inline: false,
        },
      )
      .setTimestamp();

    await this.webhookClient.send({ embeds: [embed] });
  }

  // Log AI chat messages
  async logAIChat(message, botResponse) {
    if (!this.webhookClient) return;

    const embed = new EmbedBuilder()
      .setColor("#FFAA00")
      .setTitle("💬 AI Chat")
      .addFields(
        { name: "User", value: `${message.author.tag}`, inline: true },
        { name: "Server", value: message.guild?.name || "DM", inline: true },
        { name: "Channel", value: message.channel.name, inline: true },
        {
          name: "User Message",
          value: message.content.substring(0, 500),
          inline: false,
        },
        {
          name: "Bot Response",
          value: botResponse.substring(0, 500),
          inline: false,
        },
        {
          name: "Time",
          value: `<t:${Math.floor(Date.now() / 1000)}:F>`,
          inline: false,
        },
      )
      .setTimestamp();

    await this.webhookClient.send({ embeds: [embed] });
  }

  // Log errors
  async logError(error, context = "") {
    if (!this.webhookClient) return;

    const embed = new EmbedBuilder()
      .setColor("#FF4444")
      .setTitle("❌ Error")
      .addFields(
        {
          name: "Error",
          value: error.message?.substring(0, 500) || "Unknown error",
          inline: false,
        },
        { name: "Context", value: context || "N/A", inline: false },
        {
          name: "Time",
          value: `<t:${Math.floor(Date.now() / 1000)}:F>`,
          inline: false,
        },
      )
      .setTimestamp();

    await this.webhookClient.send({ embeds: [embed] });
  }

  // Log setup command
  async logSetup(interaction, channel) {
    if (!this.webhookClient) return;

    const embed = new EmbedBuilder()
      .setColor("#00CC66")
      .setTitle("⚙️ Setup Command")
      .addFields(
        { name: "Admin", value: `${interaction.user.tag}`, inline: true },
        {
          name: "Server",
          value: interaction.guild?.name || "DM",
          inline: true,
        },
        { name: "Channel Set", value: `#${channel.name}`, inline: true },
        {
          name: "Time",
          value: `<t:${Math.floor(Date.now() / 1000)}:F>`,
          inline: false,
        },
      )
      .setTimestamp();

    await this.webhookClient.send({ embeds: [embed] });
  }
}

module.exports = new WebhookLogger();
