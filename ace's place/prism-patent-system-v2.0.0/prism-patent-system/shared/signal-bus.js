/**
 * shared/signal-bus.js
 *
 * SignalBus — the sole communication mechanism between pipeline layers.
 *
 * Architecture:
 *   - Event channels: publish/subscribe per layer, per phase
 *   - Register bank: typed key-value store for inter-layer data
 *   - History buffer: append-only log of all signal state transitions
 *
 * No layer imports another layer directly. All data flows through this bus.
 *
 * V2: Unchanged from V1. Carries forward as specified in Buildspec §0.2.
 *
 * @module shared/signal-bus
 */

/**
 * @typedef {Object} HistoryEntry
 * @property {number} timestamp - Unix timestamp (ms)
 * @property {string} type - 'emit' | 'register_set' | 'register_get'
 * @property {string} key - Channel name or register key
 * @property {*} value - Payload or register value
 */

class SignalBus {
  constructor() {
    /** @type {Map<string, Array<function>>} Event channel subscribers */
    this._channels = new Map();

    /** @type {Map<string, *>} Register bank (typed key-value store) */
    this._registers = new Map();

    /** @type {HistoryEntry[]} Append-only history buffer */
    this._history = [];

    /** @type {boolean} Dev mode enables console logging */
    this._devMode = false;
  }

  /**
   * Enable or disable dev mode (console logging).
   * Production mode logs only to history buffer.
   * @param {boolean} enabled
   */
  setDevMode(enabled) {
    this._devMode = !!enabled;
  }

  // --- EVENT CHANNELS -------------------------------------------------------

  /**
   * Emit an event on a named channel.
   * All registered handlers for this channel are invoked synchronously.
   *
   * @param {string} channel - Event channel name (e.g., 'layer.0.complete')
   * @param {*} payload - Arbitrary event payload
   * @throws {Error} If channel name is empty
   */
  emit(channel, payload) {
    if (!channel || typeof channel !== 'string') {
      throw new Error('SignalBus.emit: channel must be a non-empty string');
    }

    const entry = {
      timestamp: Date.now(),
      type: 'emit',
      key: channel,
      value: payload
    };
    this._history.push(entry);

    if (this._devMode) {
      console.log(`[SignalBus] EMIT ${channel}`, payload);
    }

    const handlers = this._channels.get(channel);
    if (handlers) {
      for (const handler of handlers) {
        try {
          handler(payload, channel);
        } catch (err) {
          this._history.push({
            timestamp: Date.now(),
            type: 'error',
            key: channel,
            value: { message: err.message, stack: err.stack }
          });
          if (this._devMode) {
            console.error(`[SignalBus] Handler error on ${channel}:`, err);
          }
        }
      }
    }
  }

  /**
   * Subscribe to events on a named channel.
   *
   * @param {string} channel - Event channel name
   * @param {function} handler - Callback receiving (payload, channel)
   * @returns {function} Unsubscribe function
   * @throws {Error} If channel is empty or handler is not a function
   */
  on(channel, handler) {
    if (!channel || typeof channel !== 'string') {
      throw new Error('SignalBus.on: channel must be a non-empty string');
    }
    if (typeof handler !== 'function') {
      throw new Error('SignalBus.on: handler must be a function');
    }

    if (!this._channels.has(channel)) {
      this._channels.set(channel, []);
    }
    this._channels.get(channel).push(handler);

    // Return unsubscribe function
    return () => {
      const handlers = this._channels.get(channel);
      if (handlers) {
        const idx = handlers.indexOf(handler);
        if (idx !== -1) handlers.splice(idx, 1);
      }
    };
  }

  /**
   * Subscribe to events matching a prefix (wildcard).
   * Useful for monitoring all layer events: on('layer.*', handler)
   *
   * @param {string} prefix - Channel prefix (without trailing dot)
   * @param {function} handler - Callback receiving (payload, channel)
   * @returns {function} Unsubscribe function
   */
  onPrefix(prefix, handler) {
    if (!prefix || typeof prefix !== 'string') {
      throw new Error('SignalBus.onPrefix: prefix must be a non-empty string');
    }
    if (typeof handler !== 'function') {
      throw new Error('SignalBus.onPrefix: handler must be a function');
    }

    // Store as a special wildcard subscription
    const wildcardKey = `__prefix__${prefix}`;
    if (!this._channels.has(wildcardKey)) {
      this._channels.set(wildcardKey, []);
    }
    this._channels.get(wildcardKey).push(handler);

    return () => {
      const handlers = this._channels.get(wildcardKey);
      if (handlers) {
        const idx = handlers.indexOf(handler);
        if (idx !== -1) handlers.splice(idx, 1);
      }
    };
  }

  // --- REGISTER BANK --------------------------------------------------------

  /**
   * Read a value from the register bank.
   *
   * @param {string} key - Register key (e.g., 'L0.substrate', 'L3.narrowing_stages')
   * @returns {*} The stored value, or undefined if not set
   */
  getRegister(key) {
    if (!key || typeof key !== 'string') {
      throw new Error('SignalBus.getRegister: key must be a non-empty string');
    }

    const value = this._registers.get(key);

    this._history.push({
      timestamp: Date.now(),
      type: 'register_get',
      key,
      value: value !== undefined ? '(read)' : '(undefined)'
    });

    return value;
  }

  /**
   * Write a value to the register bank.
   *
   * @param {string} key - Register key
   * @param {*} value - Value to store
   * @throws {Error} If key is empty
   */
  setRegister(key, value) {
    if (!key || typeof key !== 'string') {
      throw new Error('SignalBus.setRegister: key must be a non-empty string');
    }

    this._registers.set(key, value);

    this._history.push({
      timestamp: Date.now(),
      type: 'register_set',
      key,
      value: typeof value === 'object' ? JSON.stringify(value).slice(0, 200) : value
    });

    if (this._devMode) {
      console.log(`[SignalBus] SET ${key}`, typeof value === 'object' ? '{...}' : value);
    }
  }

  /**
   * Check whether a register key exists.
   *
   * @param {string} key - Register key
   * @returns {boolean}
   */
  hasRegister(key) {
    return this._registers.has(key);
  }

  /**
   * Get all register keys matching a prefix.
   * Useful for reading all outputs from a specific layer: getRegistersByPrefix('L3.')
   *
   * @param {string} prefix - Key prefix
   * @returns {Object} Key-value pairs matching the prefix
   */
  getRegistersByPrefix(prefix) {
    const result = {};
    for (const [key, value] of this._registers.entries()) {
      if (key.startsWith(prefix)) {
        result[key] = value;
      }
    }
    return result;
  }

  // --- HISTORY BUFFER -------------------------------------------------------

  /**
   * Get the complete history buffer (append-only log).
   *
   * @returns {HistoryEntry[]} Copy of the history buffer
   */
  getHistory() {
    return [...this._history];
  }

  /**
   * Get history entries filtered by type.
   *
   * @param {string} type - 'emit' | 'register_set' | 'register_get' | 'error'
   * @returns {HistoryEntry[]}
   */
  getHistoryByType(type) {
    return this._history.filter(entry => entry.type === type);
  }

  /**
   * Get history entries filtered by key prefix.
   *
   * @param {string} prefix - Key prefix to match
   * @returns {HistoryEntry[]}
   */
  getHistoryByPrefix(prefix) {
    return this._history.filter(entry => entry.key.startsWith(prefix));
  }

  // --- LIFECYCLE ------------------------------------------------------------

  /**
   * Reset the bus to initial state.
   * Clears all channels, registers, and history.
   * Used between test runs to prevent state leakage.
   */
  reset() {
    this._channels.clear();
    this._registers.clear();
    this._history = [];
  }

  /**
   * Get bus statistics for monitoring.
   *
   * @returns {Object} Channel count, register count, history length
   */
  getStats() {
    return {
      channels: this._channels.size,
      registers: this._registers.size,
      historyLength: this._history.length
    };
  }
}

// Re-patch emit to support prefix subscriptions
const originalEmit = SignalBus.prototype.emit;
SignalBus.prototype.emit = function(channel, payload) {
  originalEmit.call(this, channel, payload);

  // Check all prefix subscriptions
  for (const [key, handlers] of this._channels.entries()) {
    if (key.startsWith('__prefix__')) {
      const prefix = key.slice('__prefix__'.length);
      if (channel.startsWith(prefix)) {
        for (const handler of handlers) {
          try {
            handler(payload, channel);
          } catch (err) {
            this._history.push({
              timestamp: Date.now(),
              type: 'error',
              key: channel,
              value: { message: err.message }
            });
          }
        }
      }
    }
  }
};

module.exports = { SignalBus };
