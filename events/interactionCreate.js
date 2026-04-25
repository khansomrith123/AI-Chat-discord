// filepath: events/interactionCreate.js
const { Events } = require("discord.js");
const commandHandler = require("../handlers/commandHandler");
const webhook = require("../utils/webhook");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    // Ignore if not a command
    if (!interaction.isCommand()) return;

    // Log command usage
    await webhook.logCommand(interaction);

    // Execute the command
    await commandHandler.executeCommand(interaction, interaction.client);
  },
};
