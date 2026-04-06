/**
 * ui/pipeline-viz.js
 *
 * Pipeline visualization for L0-L9 signal flow and routing FSM.
 *
 * Renders:
 *   - 10-layer pipeline with register values
 *   - 4-state routing FSM (PLAY/WARNING/BUFFER/HARBOR)
 *   - Field signature channel indicators
 *   - Closure state indicators
 *
 * @module ui/pipeline-viz
 */

'use strict';

const LAYER_COLORS = {
  L0: '#8dd3c7',
  L1: '#ffffb3',
  L2: '#bebada',
  L3: '#fb8072',
  L4: '#80b1d3',
  L5: '#fdb462',
  L6: '#b3de69',
  L7: '#fccde5',
  L8: '#d9d9d9',
  L9: '#bc80bd'
};

const FSM_STATES = ['PLAY', 'WARNING', 'BUFFER', 'HARBOR'];
const FSM_COLORS = {
  PLAY: '#4caf50',
  WARNING: '#ff9800',
  BUFFER: '#2196f3',
  HARBOR: '#f44336'
};

class PipelineViz {
  /**
   * @param {HTMLElement} container
   */
  constructor(container) {
    this.container = container;
    this.registers = {};
    this.fsmState = 'PLAY';
    this.build();
  }

  /**
   * Build the visualization UI.
   */
  build() {
    this.container.innerHTML = `
      <div class="pipeline-viz">
        <div class="section">
          <h3>EO-RFD Pipeline (L0-L9)</h3>
          <div class="pipeline-flow" id="pipeline-flow"></div>
        </div>

        <div class="section">
          <h3>Routing FSM</h3>
          <div class="fsm-diagram" id="fsm-diagram"></div>
        </div>

        <div class="section">
          <h3>Field Signature Channels</h3>
          <div class="field-signature" id="field-signature"></div>
        </div>

        <div class="section">
          <h3>Closure State</h3>
          <div class="closure-state" id="closure-state"></div>
        </div>

        <div class="section">
          <h3>Register Bank</h3>
          <div class="register-bank" id="register-bank"></div>
        </div>
      </div>
    `;

    this.renderPipeline();
    this.renderFSM();
    this.renderFieldSignature();
    this.renderClosureState();
    this.renderRegisterBank();
  }

  /**
   * Update with new signal bus data.
   */
  update(signalBus) {
    // Extract all registers
    this.registers = {};
    for (let i = 0; i <= 9; i++) {
      const prefix = `L${i}.`;
      const regs = signalBus.getByPrefix ? signalBus.getByPrefix(prefix) : {};
      Object.assign(this.registers, regs);
    }

    // Add stance and eo registers
    if (signalBus.getByPrefix) {
      Object.assign(this.registers, signalBus.getByPrefix('stance.'));
      Object.assign(this.registers, signalBus.getByPrefix('eo.'));
    }

    // Get FSM state
    const routingState = signalBus.getRegister ? signalBus.getRegister('L7.routing_state') : null;
    this.fsmState = routingState?.state || 'PLAY';

    this.renderPipeline();
    this.renderFSM();
    this.renderFieldSignature();
    this.renderClosureState();
    this.renderRegisterBank();
  }

  /**
   * Update with raw register data.
   */
  updateFromRegisters(registers, fsmState = 'PLAY') {
    this.registers = registers;
    this.fsmState = fsmState;
    this.renderPipeline();
    this.renderFSM();
    this.renderFieldSignature();
    this.renderClosureState();
    this.renderRegisterBank();
  }

  /**
   * Render the 10-layer pipeline.
   */
  renderPipeline() {
    const container = this.container.querySelector('#pipeline-flow');
    const layers = [];

    for (let i = 0; i <= 9; i++) {
      const layerId = `L${i}`;
      const color = LAYER_COLORS[layerId];
      const layerRegs = Object.entries(this.registers)
        .filter(([k]) => k.startsWith(`${layerId}.`))
        .slice(0, 3); // Show first 3 registers per layer

      layers.push(`
        <div class="pipeline-layer" style="background: ${color}">
          <div class="layer-header">${layerId}</div>
          <div class="layer-regs">
            ${layerRegs.map(([k, v]) =>
              `<div class="reg-item">${k.replace(`${layerId}.`, '')}: ${this.formatValue(v)}</div>`
            ).join('')}
          </div>
        </div>
      `);
    }

    container.innerHTML = `
      <div class="pipeline-layers">
        ${layers.join('<div class="pipeline-arrow">→</div>')}
      </div>
    `;
  }

  /**
   * Render the routing FSM.
   */
  renderFSM() {
    const container = this.container.querySelector('#fsm-diagram');

    const states = FSM_STATES.map(state => {
      const isActive = this.fsmState === state;
      const color = FSM_COLORS[state];
      return `
        <div class="fsm-state ${isActive ? 'active' : ''}"
             style="background: ${isActive ? color : '#eee'}; color: ${isActive ? '#fff' : '#666'}">
          ${state}
        </div>
      `;
    });

    container.innerHTML = `
      <div class="fsm-states">
        ${states.join('<div class="fsm-arrow">→</div>')}
      </div>
      <div class="fsm-current">Current: <strong>${this.fsmState}</strong></div>
    `;
  }

  /**
   * Render field signature channel indicators.
   */
  renderFieldSignature() {
    const container = this.container.querySelector('#field-signature');
    const channels = [
      'PriorArtDensity',
      'ClaimBreadth',
      'EnablementQuality',
      'WrittenDescSupport',
      'NonObviousness',
      'IndustrialApplicability',
      'GeometricCoherence'
    ];

    const html = channels.map(ch => {
      const key = `L4.field_signature`;
      const sig = this.registers[key] || {};
      const val = sig[ch] !== undefined ? sig[ch] : (this.registers[`eo.fieldSignature`]?.[ch] || 0);
      const pct = Math.round(val * 100);
      const color = val > 0.7 ? '#4caf50' : val > 0.4 ? '#ff9800' : '#f44336';

      return `
        <div class="channel">
          <div class="channel-name">${ch}</div>
          <div class="channel-bar">
            <div class="channel-fill" style="width: ${pct}%; background: ${color}"></div>
          </div>
          <div class="channel-value">${pct}%</div>
        </div>
      `;
    }).join('');

    container.innerHTML = html || '<div class="no-data">No field signature data</div>';
  }

  /**
   * Render closure state indicators.
   */
  renderClosureState() {
    const container = this.container.querySelector('#closure-state');

    const closureState = this.registers['L8.closure_state'] ||
                         this.registers['eo.closureState'] ||
                         {};

    const indicators = [
      {
        name: 'extAdmitted',
        label: 'Extension Admitted',
        value: closureState.extAdmitted,
        good: true
      },
      {
        name: 'closureFailure',
        label: 'Closure Failure',
        value: closureState.closureFailure,
        good: false
      },
      {
        name: 'uniqueClosure',
        label: 'Unique Closure',
        value: closureState.uniqueClosure,
        good: true
      }
    ];

    const html = indicators.map(ind => {
      const val = ind.value;
      const isGood = ind.good ? val === true : val === false;
      const color = isGood ? '#4caf50' : '#f44336';
      const icon = val ? '✓' : '✗';

      return `
        <div class="closure-indicator">
          <span class="indicator-icon" style="color: ${color}">${icon}</span>
          <span class="indicator-label">${ind.label}</span>
          <span class="indicator-value">${val === undefined ? 'N/A' : val}</span>
        </div>
      `;
    }).join('');

    // Add numeric metrics
    const metrics = [];
    if (closureState.k4Deficit !== undefined) {
      metrics.push(`k4Deficit: ${closureState.k4Deficit.toFixed(4)}`);
    }
    if (closureState.sigmaR !== undefined) {
      metrics.push(`sigmaR: ${closureState.sigmaR.toFixed(4)}`);
    }

    container.innerHTML = `
      <div class="closure-indicators">${html}</div>
      ${metrics.length > 0 ? `<div class="closure-metrics">${metrics.join(' | ')}</div>` : ''}
    `;
  }

  /**
   * Render full register bank.
   */
  renderRegisterBank() {
    const container = this.container.querySelector('#register-bank');

    const entries = Object.entries(this.registers)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(0, 30); // Limit to first 30

    if (entries.length === 0) {
      container.innerHTML = '<div class="no-data">No registers loaded</div>';
      return;
    }

    const html = entries.map(([k, v]) => `
      <div class="register-row">
        <span class="register-key">${k}</span>
        <span class="register-value">${this.formatValue(v)}</span>
      </div>
    `).join('');

    container.innerHTML = `<div class="register-list">${html}</div>`;
  }

  /**
   * Format a register value for display.
   */
  formatValue(v) {
    if (v === null || v === undefined) return 'null';
    if (typeof v === 'number') return v.toFixed(4);
    if (typeof v === 'boolean') return v ? 'true' : 'false';
    if (typeof v === 'string') return v.length > 30 ? v.slice(0, 30) + '...' : v;
    if (Array.isArray(v)) return `[${v.length} items]`;
    if (typeof v === 'object') return `{${Object.keys(v).length} keys}`;
    return String(v);
  }
}

// Export for browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PipelineViz, LAYER_COLORS, FSM_STATES, FSM_COLORS };
}
