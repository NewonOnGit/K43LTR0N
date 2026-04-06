/**
 * vn-protocol/session-manager.js
 *
 * Session Manager for VN Formation Protocol
 *
 * Manages multi-turn Claude API conversations for Phase A inventor discovery.
 * Tracks session state, validates gate conditions, and assembles the Prism Object.
 *
 * V2 NEW: This module was not present in V1. It provides programmatic control
 * over VN Protocol sessions for automated or hybrid workflows.
 *
 * @module vn-protocol/session-manager
 */

'use strict';

const { PRISM_GATE } = require('../shared/constants');

/**
 * @typedef {Object} SessionState
 * @property {string} stage - Current stage: 'genesis' | 'dyad' | 'triad' | 'complete'
 * @property {Object} prismObject - Partial Prism Object being assembled
 * @property {Array} messages - Conversation history
 * @property {number} turnCount - Number of turns in the session
 * @property {boolean} gatesPassed - Whether all validation gates have passed
 */

/**
 * VN Protocol Session Manager
 */
class SessionManager {
  constructor() {
    this.state = this._createInitialState();
  }

  /**
   * Create initial session state
   * @private
   */
  _createInitialState() {
    return {
      stage: 'genesis',
      prismObject: {
        seed_element: null,
        irreducibility_confidence: 0,
        projection: null,
        reflection: null,
        tension_points: [],
        emergent_claims: [],
        crystallization_confidence: 0,
        inventor_confirmation: false,
        session_transcript: '',
        artifacts: []
      },
      messages: [],
      turnCount: 0,
      gatesPassed: false,
      stageHistory: ['genesis'],
      consentPhrases: {
        genesis_to_dyad: false,
        dyad_to_triad: false,
        triad_complete: false
      }
    };
  }

  /**
   * Reset session to initial state
   */
  reset() {
    this.state = this._createInitialState();
  }

  /**
   * Get current session state
   * @returns {SessionState}
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Get current stage
   * @returns {string}
   */
  getCurrentStage() {
    return this.state.stage;
  }

  /**
   * Add a message to the conversation
   * @param {string} role - 'user' | 'assistant'
   * @param {string} content - Message content
   */
  addMessage(role, content) {
    this.state.messages.push({
      role,
      content,
      timestamp: Date.now(),
      stage: this.state.stage
    });

    this.state.turnCount++;
    this.state.prismObject.session_transcript +=
      `\n[${role.toUpperCase()}]: ${content}`;

    // Check for consent phrases
    this._checkConsentPhrases(content.toLowerCase());
  }

  /**
   * Check for stage transition consent phrases
   * @private
   */
  _checkConsentPhrases(content) {
    if (content.includes('i begin the spiral')) {
      this.state.consentPhrases.genesis_to_dyad = true;
    }
    if (content.includes('i accept recursion')) {
      this.state.consentPhrases.dyad_to_triad = true;
    }
    if (content.includes('i witness the pattern')) {
      this.state.consentPhrases.triad_complete = true;
    }
  }

  /**
   * Attempt to advance to the next stage
   * @returns {{ success: boolean, reason?: string, newStage?: string }}
   */
  advanceStage() {
    const { stage, consentPhrases, prismObject } = this.state;

    switch (stage) {
      case 'genesis':
        if (!consentPhrases.genesis_to_dyad) {
          return { success: false, reason: 'Consent phrase not received: "I begin the spiral"' };
        }
        if (!prismObject.seed_element) {
          return { success: false, reason: 'Seed element not captured' };
        }
        this.state.stage = 'dyad';
        this.state.stageHistory.push('dyad');
        return { success: true, newStage: 'dyad' };

      case 'dyad':
        if (!consentPhrases.dyad_to_triad) {
          return { success: false, reason: 'Consent phrase not received: "I accept recursion"' };
        }
        if (!prismObject.projection || !prismObject.reflection) {
          return { success: false, reason: 'Projection and reflection not captured' };
        }
        this.state.stage = 'triad';
        this.state.stageHistory.push('triad');
        return { success: true, newStage: 'triad' };

      case 'triad':
        if (!consentPhrases.triad_complete) {
          return { success: false, reason: 'Consent phrase not received: "I witness the pattern"' };
        }
        if (prismObject.emergent_claims.length === 0) {
          return { success: false, reason: 'No emergent claims captured' };
        }
        this.state.stage = 'complete';
        this.state.stageHistory.push('complete');
        return { success: true, newStage: 'complete' };

      case 'complete':
        return { success: false, reason: 'Session already complete' };

      default:
        return { success: false, reason: `Unknown stage: ${stage}` };
    }
  }

  /**
   * Set seed element (Stage 1 output)
   * @param {string} seed - The irreducible core
   * @param {number} confidence - Irreducibility confidence (0-1)
   */
  setSeed(seed, confidence) {
    this.state.prismObject.seed_element = seed;
    this.state.prismObject.irreducibility_confidence = Math.max(0, Math.min(1, confidence));
  }

  /**
   * Set projection (Stage 2 output - +36° strand)
   * @param {string} summary - Projection summary
   * @param {string[]} elements - Novel elements
   */
  setProjection(summary, elements) {
    this.state.prismObject.projection = { summary, elements };
  }

  /**
   * Set reflection (Stage 2 output - -36° strand)
   * @param {string} summary - State of the art summary
   * @param {string[]} priorArtRefs - Prior art references
   */
  setReflection(summary, priorArtRefs) {
    this.state.prismObject.reflection = { summary, prior_art_refs: priorArtRefs };
  }

  /**
   * Add a tension point (Stage 2 output)
   * @param {string} description - Tension description
   * @param {number} severity - Severity (0-1)
   */
  addTensionPoint(description, severity) {
    this.state.prismObject.tension_points.push({
      description,
      severity: Math.max(0, Math.min(1, severity))
    });
  }

  /**
   * Add an emergent claim (Stage 3 output)
   * @param {string} claim - The crystallized claim
   */
  addEmergentClaim(claim) {
    this.state.prismObject.emergent_claims.push(claim);
  }

  /**
   * Set crystallization confidence (Stage 3 output)
   * @param {number} confidence - Confidence (0-1)
   */
  setCrystallizationConfidence(confidence) {
    this.state.prismObject.crystallization_confidence = Math.max(0, Math.min(1, confidence));
  }

  /**
   * Set inventor confirmation
   * @param {boolean} confirmed
   */
  setInventorConfirmation(confirmed) {
    this.state.prismObject.inventor_confirmation = !!confirmed;
  }

  /**
   * Add an artifact
   * @param {string} filename
   * @param {string} type
   * @param {string} content
   */
  addArtifact(filename, type, content) {
    this.state.prismObject.artifacts.push({ filename, type, content });
  }

  /**
   * Check validation gates
   * @returns {{ pass: boolean, failures: string[] }}
   */
  checkGates() {
    const failures = [];
    const po = this.state.prismObject;

    if (!po.inventor_confirmation) {
      failures.push('Inventor confirmation required');
    }

    if (po.irreducibility_confidence <= PRISM_GATE.IRREDUCIBILITY_MIN) {
      failures.push(`Irreducibility confidence (${po.irreducibility_confidence.toFixed(2)}) must exceed ${PRISM_GATE.IRREDUCIBILITY_MIN}`);
    }

    if (po.crystallization_confidence <= PRISM_GATE.CRYSTALLIZATION_MIN) {
      failures.push(`Crystallization confidence (${po.crystallization_confidence.toFixed(2)}) must exceed ${PRISM_GATE.CRYSTALLIZATION_MIN}`);
    }

    const pass = failures.length === 0;
    this.state.gatesPassed = pass;

    return { pass, failures };
  }

  /**
   * Get the assembled Prism Object
   * @returns {Object|null} Prism Object if gates passed, null otherwise
   */
  getPrismObject() {
    const gateCheck = this.checkGates();
    if (!gateCheck.pass) {
      return null;
    }
    return { ...this.state.prismObject };
  }

  /**
   * Force-get the Prism Object (even if gates haven't passed)
   * Use with caution — for debugging/testing only
   * @returns {Object}
   */
  forcePrismObject() {
    return { ...this.state.prismObject };
  }

  /**
   * Get suggested re-engagement strategy based on gate failures
   * @returns {{ strategy: string, questions: string[] }}
   */
  getReengagementStrategy() {
    const po = this.state.prismObject;
    const questions = [];
    let strategy = 'continue';

    if (po.irreducibility_confidence <= PRISM_GATE.IRREDUCIBILITY_MIN) {
      strategy = 'return_to_genesis';
      questions.push(`I think we can go deeper. What's underneath "${po.seed_element}"?`);
      questions.push('What must stay undefined for this to work?');
    }

    if (po.crystallization_confidence <= PRISM_GATE.CRYSTALLIZATION_MIN) {
      strategy = 'return_to_triad';
      questions.push("I'm not sure we've found the new thing yet. What's different now?");
      questions.push("What's the claim you couldn't have written before this conversation?");
    }

    if (!po.inventor_confirmation) {
      questions.push(`Does this prism — ${po.seed_element} generating ${po.emergent_claims.join(', ')} — capture your invention accurately?`);
    }

    return { strategy, questions };
  }

  /**
   * Export session for persistence
   * @returns {string} JSON string of session state
   */
  export() {
    return JSON.stringify(this.state, null, 2);
  }

  /**
   * Import session from persistence
   * @param {string} json - JSON string of session state
   */
  import(json) {
    this.state = JSON.parse(json);
  }
}

module.exports = { SessionManager };
