/**
 * SignalBus: Typed Pub/Sub for Agent Communication
 * Register: UCF
 *
 * All inter-agent communication flows through this bus.
 * Each message has: source (agent ID), target (agent ID or '*'), type, payload, timestamp.
 */

/**
 * SignalBus: Central message broker for the agent system
 */
export class SignalBus {
    constructor() {
        this.handlers = new Map();
        this.history = [];
        this.historyLimit = 1000;
    }

    /**
     * Subscribe to a message type
     * @param {string} type - Message type or '*' for all
     * @param {function} handler - Callback function(msg)
     * @returns {function} Unsubscribe function
     */
    subscribe(type, handler) {
        if (!this.handlers.has(type)) {
            this.handlers.set(type, new Set());
        }
        this.handlers.get(type).add(handler);

        // Return unsubscribe function
        return () => this.handlers.get(type)?.delete(handler);
    }

    /**
     * Emit a message to the bus
     * @param {Object} msg - { source, target, type, payload }
     */
    emit(msg) {
        const fullMsg = {
            ...msg,
            timestamp: performance.now(),
        };

        // Record in history
        this.history.push(fullMsg);
        if (this.history.length > this.historyLimit) {
            this.history = this.history.slice(-this.historyLimit);
        }

        // Notify type-specific handlers
        const typeHandlers = this.handlers.get(msg.type);
        if (typeHandlers) {
            for (const handler of typeHandlers) {
                try {
                    handler(fullMsg);
                } catch (e) {
                    console.error(`SignalBus handler error for ${msg.type}:`, e);
                }
            }
        }

        // Notify wildcard handlers
        const wildcardHandlers = this.handlers.get('*');
        if (wildcardHandlers) {
            for (const handler of wildcardHandlers) {
                try {
                    handler(fullMsg);
                } catch (e) {
                    console.error('SignalBus wildcard handler error:', e);
                }
            }
        }
    }

    /**
     * Get recent message history
     * @param {number} limit - Max messages to return
     * @returns {Array}
     */
    getHistory(limit = 100) {
        return this.history.slice(-limit);
    }

    /**
     * Get history filtered by type
     * @param {string} type
     * @param {number} limit
     * @returns {Array}
     */
    getHistoryByType(type, limit = 100) {
        return this.history.filter(m => m.type === type).slice(-limit);
    }

    /**
     * Clear all handlers and history
     */
    reset() {
        this.handlers.clear();
        this.history = [];
    }
}

// Global singleton bus
export const bus = new SignalBus();

// Message type constants
export const MSG = {
    // Phase 1
    CONSTANTS_READY: 'CONSTANTS_READY',
    GEOMETRY_READY: 'GEOMETRY_READY',

    // Phase 2
    STATE_COMPUTED: 'STATE_COMPUTED',
    OPERATOR_FITTED: 'OPERATOR_FITTED',

    // Phase 3
    CYM_COMPUTED: 'CYM_COMPUTED',
    PARTICLES_UPDATED: 'PARTICLES_UPDATED',

    // Phase 4
    FRAME_RENDERED: 'FRAME_RENDERED',

    // Control
    MU_CHANGED: 'MU_CHANGED',
    ANOMALY_DETECTED: 'ANOMALY_DETECTED',
    RESET: 'RESET',
};

// Agent ID constants
export const AGENT = {
    CORE: 'AS-CORE',
    PHYSICS: 'AS-PHYSICS',
    GEOMETRY: 'AS-GEOMETRY',
    OPERATOR: 'AS-OPERATOR',
    CYM: 'AS-CYM',
    PARTICLE: 'AS-PARTICLE',
    ANIMATE: 'AS-ANIMATE',
    RENDER: 'AS-RENDER',
    UI: 'UI',
};
