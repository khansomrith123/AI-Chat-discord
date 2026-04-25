// filepath: utils/cooldown.js
const config = require("../config/bot");

class Cooldown {
  constructor() {
    this.cooldowns = config.commands.cooldown;
  }

  // Check if user is on cooldown
  isOnCooldown(userId) {
    if (this.cooldowns.has(userId)) {
      const cooldownEnd = this.cooldowns.get(userId);
      if (Date.now() < cooldownEnd) {
        return true;
      }
      this.cooldowns.delete(userId);
    }
    return false;
  }

  // Get remaining cooldown time
  getRemainingTime(userId) {
    if (this.cooldowns.has(userId)) {
      const cooldownEnd = this.cooldowns.get(userId);
      const remaining = cooldownEnd - Date.now();
      return remaining > 0 ? remaining : 0;
    }
    return 0;
  }

  // Set cooldown for user
  setCooldown(userId) {
    this.cooldowns.set(userId, Date.now() + config.bot.cooldown);
  }

  // Clear cooldown for user
  clearCooldown(userId) {
    this.cooldowns.delete(userId);
  }
}

module.exports = new Cooldown();
