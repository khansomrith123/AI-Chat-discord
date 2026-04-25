// filepath: handlers/eventHandler.js
const fs = require("fs");
const path = require("path");
const { Events } = require("discord.js");

class EventHandler {
  constructor() {
    this.events = new Map();
  }

  // Load all events
  loadEvents(client) {
    const eventsPath = path.join(__dirname, "../events");
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const event = require(path.join(eventsPath, file));

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }

      this.events.set(event.name, event);
    }

    console.log(`✅ Loaded ${this.events.size} events`);
  }
}

module.exports = new EventHandler();
