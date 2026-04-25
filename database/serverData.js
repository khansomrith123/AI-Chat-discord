// filepath: database/serverData.js
const fs = require("fs");
const path = require("path");

class ServerDatabase {
  constructor() {
    this.dbPath = path.join(__dirname, "serverData.json");
    this.data = this.loadData();
  }

  // Load data from JSON file
  loadData() {
    try {
      if (fs.existsSync(this.dbPath)) {
        const fileData = fs.readFileSync(this.dbPath, "utf8");
        return JSON.parse(fileData);
      }
    } catch (error) {
      console.error("Error loading database:", error);
    }
    return {};
  }

  // Save data to JSON file
  saveData() {
    try {
      fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error("Error saving database:", error);
    }
  }

  // Get server data
  getServer(guildId) {
    if (!this.data[guildId]) {
      this.data[guildId] = {
        aiChannelId: null,
        language: "en",
        conversationHistory: [],
      };
    }
    return this.data[guildId];
  }

  // Set AI channel for a server
  setAIChannel(guildId, channelId) {
    const server = this.getServer(guildId);
    server.aiChannelId = channelId;
    this.saveData();
    return server;
  }

  // Get AI channel for a server
  getAIChannel(guildId) {
    const server = this.getServer(guildId);
    return server.aiChannelId;
  }

  // Set language for a server
  setLanguage(guildId, language) {
    const server = this.getServer(guildId);
    server.language = language;
    this.saveData();
    return server;
  }

  // Get language for a server
  getLanguage(guildId) {
    const server = this.getServer(guildId);
    return server.language;
  }

  // Add message to conversation history
  addMessage(guildId, role, content) {
    const server = this.getServer(guildId);
    server.conversationHistory.push({ role, content });

    // Keep only last 20 messages
    if (server.conversationHistory.length > 20) {
      server.conversationHistory = server.conversationHistory.slice(-20);
    }

    this.saveData();
  }

  // Get conversation history
  getConversationHistory(guildId) {
    const server = this.getServer(guildId);
    return server.conversationHistory;
  }

  // Clear conversation history
  clearConversation(guildId) {
    const server = this.getServer(guildId);
    server.conversationHistory = [];
    this.saveData();
    return server;
  }
}

module.exports = new ServerDatabase();
