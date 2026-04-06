/**
 * ui/stance-editor.js
 *
 * Interactive editor for geometric stance parameters.
 *
 * Provides:
 *   - Numeric input fields for quad vertices and path points
 *   - Preset configurations (default, compressed, deflected)
 *   - Real-time framework recomputation on change
 *   - Export/import of stance configurations
 *
 * @module ui/stance-editor
 */

'use strict';

// Default configurations
const PRESETS = {
  default: {
    name: 'Default',
    quad: [[0, 0], [1, 0], [1, 1], [0, 1]],
    path: [[0.2, 0.5], [0.5, 0.5], [0.8, 0.5]]
  },
  compressed: {
    name: 'High Compression',
    quad: [[0, 0], [1, 0], [1, 1], [0, 1]],
    path: [[0.1, 0.3], [0.5, 0.5], [0.9, 0.7]]
  },
  deflected: {
    name: 'High Deflection',
    quad: [[0, 0], [1.2, 0], [0.8, 1], [0, 1]],
    path: [[0.2, 0.2], [0.6, 0.4], [0.4, 0.8]]
  },
  exterior: {
    name: 'Observer Outside Q',
    quad: [[0.2, 0.2], [0.8, 0.2], [0.8, 0.8], [0.2, 0.8]],
    path: [[-0.2, 0.5], [0.5, 0.5], [1.2, 0.5]]
  },
  narrow: {
    name: 'Narrow Passage',
    quad: [[0, 0], [1, 0], [0.6, 1], [0.4, 1]],
    path: [[0.2, 0.2], [0.5, 0.5], [0.5, 0.9]]
  }
};

class StanceEditor {
  /**
   * @param {HTMLElement} container - Container element for the editor
   * @param {Object} options
   */
  constructor(container, options = {}) {
    this.container = container;
    this.onChange = options.onChange || (() => {});

    // Current stance
    this.quad = JSON.parse(JSON.stringify(PRESETS.default.quad));
    this.path = JSON.parse(JSON.stringify(PRESETS.default.path));

    this.build();
  }

  /**
   * Build the editor UI.
   */
  build() {
    this.container.innerHTML = `
      <div class="stance-editor">
        <h3>Geometric Stance Editor</h3>

        <div class="section">
          <h4>Presets</h4>
          <select id="preset-select">
            ${Object.entries(PRESETS).map(([key, val]) =>
              `<option value="${key}">${val.name}</option>`
            ).join('')}
          </select>
          <button id="apply-preset">Apply</button>
        </div>

        <div class="section">
          <h4>Containment Quadrilateral Q</h4>
          <div class="point-inputs" id="quad-inputs"></div>
        </div>

        <div class="section">
          <h4>Observer Path L→E→R</h4>
          <div class="point-inputs" id="path-inputs"></div>
        </div>

        <div class="section">
          <h4>Import/Export</h4>
          <button id="export-stance">Export JSON</button>
          <button id="import-stance">Import JSON</button>
          <input type="file" id="import-file" accept=".json" style="display:none">
        </div>
      </div>
    `;

    this.buildQuadInputs();
    this.buildPathInputs();
    this.attachListeners();
  }

  /**
   * Build quad vertex input fields.
   */
  buildQuadInputs() {
    const container = this.container.querySelector('#quad-inputs');
    const labels = ['Q0', 'Q1', 'Q2', 'Q3'];

    container.innerHTML = this.quad.map((pt, i) => `
      <div class="point-row">
        <label>${labels[i]}</label>
        <input type="number" step="0.01" class="quad-x" data-index="${i}" value="${pt[0].toFixed(2)}">
        <input type="number" step="0.01" class="quad-y" data-index="${i}" value="${pt[1].toFixed(2)}">
      </div>
    `).join('');
  }

  /**
   * Build path point input fields.
   */
  buildPathInputs() {
    const container = this.container.querySelector('#path-inputs');
    const labels = ['L (Latent)', 'E (Explorer)', 'R (Registered)'];

    container.innerHTML = this.path.map((pt, i) => `
      <div class="point-row">
        <label>${labels[i]}</label>
        <input type="number" step="0.01" class="path-x" data-index="${i}" value="${pt[0].toFixed(2)}">
        <input type="number" step="0.01" class="path-y" data-index="${i}" value="${pt[1].toFixed(2)}">
      </div>
    `).join('');
  }

  /**
   * Attach event listeners.
   */
  attachListeners() {
    // Quad input changes
    this.container.querySelectorAll('.quad-x, .quad-y').forEach(input => {
      input.addEventListener('change', (e) => {
        const idx = parseInt(e.target.dataset.index);
        const isX = e.target.classList.contains('quad-x');
        const val = parseFloat(e.target.value) || 0;
        this.quad[idx][isX ? 0 : 1] = val;
        this.emitChange();
      });
    });

    // Path input changes
    this.container.querySelectorAll('.path-x, .path-y').forEach(input => {
      input.addEventListener('change', (e) => {
        const idx = parseInt(e.target.dataset.index);
        const isX = e.target.classList.contains('path-x');
        const val = parseFloat(e.target.value) || 0;
        this.path[idx][isX ? 0 : 1] = val;
        this.emitChange();
      });
    });

    // Preset application
    this.container.querySelector('#apply-preset').addEventListener('click', () => {
      const key = this.container.querySelector('#preset-select').value;
      this.applyPreset(key);
    });

    // Export
    this.container.querySelector('#export-stance').addEventListener('click', () => {
      this.exportStance();
    });

    // Import
    this.container.querySelector('#import-stance').addEventListener('click', () => {
      this.container.querySelector('#import-file').click();
    });

    this.container.querySelector('#import-file').addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.importStance(e.target.files[0]);
      }
    });
  }

  /**
   * Apply a preset configuration.
   */
  applyPreset(key) {
    const preset = PRESETS[key];
    if (!preset) return;

    this.quad = JSON.parse(JSON.stringify(preset.quad));
    this.path = JSON.parse(JSON.stringify(preset.path));

    this.buildQuadInputs();
    this.buildPathInputs();
    this.attachListeners();
    this.emitChange();
  }

  /**
   * Set stance from external source (e.g., canvas drag).
   */
  setStance(quad, path) {
    this.quad = JSON.parse(JSON.stringify(quad));
    this.path = JSON.parse(JSON.stringify(path));
    this.updateInputValues();
  }

  /**
   * Update input field values from current state.
   */
  updateInputValues() {
    this.container.querySelectorAll('.quad-x').forEach(input => {
      const idx = parseInt(input.dataset.index);
      input.value = this.quad[idx][0].toFixed(2);
    });
    this.container.querySelectorAll('.quad-y').forEach(input => {
      const idx = parseInt(input.dataset.index);
      input.value = this.quad[idx][1].toFixed(2);
    });
    this.container.querySelectorAll('.path-x').forEach(input => {
      const idx = parseInt(input.dataset.index);
      input.value = this.path[idx][0].toFixed(2);
    });
    this.container.querySelectorAll('.path-y').forEach(input => {
      const idx = parseInt(input.dataset.index);
      input.value = this.path[idx][1].toFixed(2);
    });
  }

  /**
   * Emit change event.
   */
  emitChange() {
    this.onChange(this.quad, this.path);
  }

  /**
   * Export current stance to JSON file.
   */
  exportStance() {
    const data = {
      version: '2.0.0',
      timestamp: new Date().toISOString(),
      quad: this.quad,
      path: this.path
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stance-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Import stance from JSON file.
   */
  importStance(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.quad && data.path) {
          this.quad = data.quad;
          this.path = data.path;
          this.buildQuadInputs();
          this.buildPathInputs();
          this.attachListeners();
          this.emitChange();
        }
      } catch (err) {
        console.error('Failed to import stance:', err);
        alert('Invalid stance file');
      }
    };
    reader.readAsText(file);
  }

  /**
   * Get current stance.
   */
  getStance() {
    return {
      quad: this.quad,
      path: this.path
    };
  }
}

// Export for browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StanceEditor, PRESETS };
}
