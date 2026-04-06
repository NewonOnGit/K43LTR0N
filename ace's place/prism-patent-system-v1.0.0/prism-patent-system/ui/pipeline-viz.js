/**
 * ui/pipeline-viz.js
 * 
 * Real-time pipeline visualization.
 * Subscribes to SignalBus events and updates DOM layer-by-layer.
 * 
 * Features:
 *   - 10-layer flow diagram (L0–L9)
 *   - Per-layer state display: idle/active/complete/error
 *   - Key output metrics per layer
 *   - Color-coded layer states
 *   - Active layer highlighting
 *   - Feedback loop visualization (B→A, C→B)
 * 
 * @module ui/pipeline-viz
 */

'use strict';

const LAYER_NAMES = [
  'L0: Substrate',
  'L1: Propagation',
  'L2: Admissibility',
  'L3: Narrowing',
  'L4: Field Signature',
  'L5: Integrity',
  'L6: Regime Detection',
  'L7: Routing',
  'L8: Document Assembly',
  'L9: Portfolio Oversight'
];

const STATE_COLORS = {
  idle: '#6c757d',
  active: '#ffc107',
  complete: '#28a745',
  error: '#dc3545'
};

/**
 * Initialize the pipeline visualization.
 * Creates DOM elements and subscribes to SignalBus events.
 * 
 * @param {HTMLElement} container - The DOM container for the visualization
 * @param {import('../shared/signal-bus').SignalBus} signalBus - The signal bus
 * @returns {Object} Controller with update methods
 */
function initPipelineViz(container, signalBus) {
  if (!container) {
    throw new Error('initPipelineViz: container element required');
  }

  // Build DOM structure
  container.innerHTML = '';
  container.className = 'pipeline-viz';

  const layers = [];

  for (let i = 0; i < 10; i++) {
    const layerEl = document.createElement('div');
    layerEl.className = 'pipeline-layer';
    layerEl.id = `layer-L${i}`;
    layerEl.innerHTML = `
      <div class="layer-header">
        <span class="layer-indicator" style="background:${STATE_COLORS.idle}"></span>
        <span class="layer-name">${LAYER_NAMES[i]}</span>
        <span class="layer-state">idle</span>
      </div>
      <div class="layer-metrics" style="display:none"></div>
    `;
    container.appendChild(layerEl);

    // Add connector arrow between layers
    if (i < 9) {
      const arrow = document.createElement('div');
      arrow.className = 'pipeline-arrow';
      arrow.textContent = '↓';
      container.appendChild(arrow);
    }

    layers.push({
      element: layerEl,
      indicator: layerEl.querySelector('.layer-indicator'),
      stateLabel: layerEl.querySelector('.layer-state'),
      metrics: layerEl.querySelector('.layer-metrics'),
      state: 'idle'
    });
  }

  // Feedback loop indicators
  const feedbackPanel = document.createElement('div');
  feedbackPanel.className = 'feedback-panel';
  feedbackPanel.innerHTML = `
    <div id="feedback-b-to-a" class="feedback-loop" style="display:none">
      <span class="feedback-arrow">⟲ B→A</span>
      <span class="feedback-reason"></span>
    </div>
    <div id="feedback-c-to-b" class="feedback-loop" style="display:none">
      <span class="feedback-arrow">⟲ C→B</span>
      <span class="feedback-reason"></span>
    </div>
  `;
  container.appendChild(feedbackPanel);

  // Subscribe to layer events
  for (let i = 0; i < 10; i++) {
    const layerId = `L${i}`;

    signalBus.on(`layer.${layerId}.complete`, (payload) => {
      updateLayerState(layers[i], 'complete', payload);
    });

    signalBus.on(`layer.${layerId}.error`, (payload) => {
      updateLayerState(layers[i], 'error', payload);
    });
  }

  // Subscribe to feedback loops
  signalBus.on('feedback.b_to_a', (payload) => {
    const el = document.getElementById('feedback-b-to-a');
    if (el) {
      el.style.display = 'block';
      el.querySelector('.feedback-reason').textContent = payload.failure_mode || 'unknown';
    }
  });

  signalBus.on('feedback.c_to_b', (payload) => {
    const el = document.getElementById('feedback-c-to-b');
    if (el) {
      el.style.display = 'block';
      el.querySelector('.feedback-reason').textContent = payload.failure_mode || 'unknown';
    }
  });

  /**
   * Update a layer's visual state.
   */
  function updateLayerState(layer, state, payload) {
    layer.state = state;
    layer.indicator.style.background = STATE_COLORS[state] || STATE_COLORS.idle;
    layer.stateLabel.textContent = state;
    layer.element.className = `pipeline-layer pipeline-layer--${state}`;

    if (payload && state === 'complete') {
      layer.metrics.style.display = 'block';
      layer.metrics.innerHTML = formatMetrics(payload);
    } else if (state === 'error') {
      layer.metrics.style.display = 'block';
      layer.metrics.innerHTML = `<span class="error-msg">${payload?.message || 'Error'}</span>`;
    }
  }

  /**
   * Format payload metrics for display.
   */
  function formatMetrics(payload) {
    if (!payload || typeof payload !== 'object') return '';
    return Object.entries(payload)
      .filter(([k, v]) => typeof v !== 'object')
      .map(([k, v]) => `<span class="metric">${k}: <strong>${typeof v === 'number' ? v.toFixed(3) : v}</strong></span>`)
      .join(' ');
  }

  /**
   * Mark a layer as active (currently processing).
   */
  function setActiveLayer(index) {
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].state !== 'complete' && layers[i].state !== 'error') {
        updateLayerState(layers[i], i === index ? 'active' : 'idle', null);
      }
    }
  }

  /**
   * Reset all layers to idle.
   */
  function reset() {
    for (const layer of layers) {
      updateLayerState(layer, 'idle', null);
      layer.metrics.style.display = 'none';
    }
    const bToA = document.getElementById('feedback-b-to-a');
    const cToB = document.getElementById('feedback-c-to-b');
    if (bToA) bToA.style.display = 'none';
    if (cToB) cToB.style.display = 'none';
  }

  return { setActiveLayer, reset, layers };
}

// Export for both browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initPipelineViz, LAYER_NAMES, STATE_COLORS };
}
