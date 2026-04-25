// filepath: handlers/commandHandler.js
const fs = require("fs");
const path = require("path");

class CommandHandler {
  constructor() {
    this.commands = new Map();
  }

  // Load all slash commands
  async loadCommands(client) {
    const commandsPath = path.join(__dirname, "../commands");
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(path.join(commandsPath, file));
      this.commands.set(command.data.name, command);
      client.commands.set(command.data.name, command);
    }

    console.log(`✅ Loaded ${this.commands.size} commands`);
  }

  // Get command
  getCommand(name) {
    return this.commands.get(name);
  }

  // Execute command
  async executeCommand(interaction, client) {
    const command = this.commands.get(interaction.commandName);

    if (!command) {
      return interaction.reply({
        embeds: [
          require("../utils/embed").error(
            "Command Not Found",
            "This command does not exist.",
          ),
        ],
        ephemeral: true,
      });
    }

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error("Command execution error:", error);
      // Log error to webhook
      const webhook = require("../utils/webhook");
      await webhook.logError(error, `Command: /${interaction.commandName}`);
      await interaction.reply({
        embeds: [
          require("../utils/embed").error(
            "Error",
            "An error occurred while executing this command.",
          ),
        ],
        ephemeral: true,
      });
    }
  }
}

module.exports = new CommandHandler();
