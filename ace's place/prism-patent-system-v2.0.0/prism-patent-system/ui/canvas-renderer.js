/**
 * ui/canvas-renderer.js
 *
 * Canvas-based geometric stance visualization.
 *
 * Renders:
 *   - Containment quadrilateral Q (prior art landscape)
 *   - Observer path L→E→R through the interior
 *   - im/ker area decomposition with color coding
 *   - Real-time metrics overlay
 *
 * @module ui/canvas-renderer
 */

'use strict';

const COLORS = {
  Q_FILL: 'rgba(200, 220, 255, 0.3)',
  Q_STROKE: '#4477aa',
  PATH_L: '#22aa22',
  PATH_E: '#aa8800',
  PATH_R: '#aa2222',
  KER_FILL: 'rgba(255, 100, 100, 0.2)',
  IM_FILL: 'rgba(100, 255, 100, 0.2)',
  POINT: '#333',
  POINT_HOVER: '#0066ff',
  GRID: 'rgba(0,0,0,0.05)',
  TEXT: '#333',
  THRESHOLD: 'rgba(136, 102, 0, 0.5)'
};

class CanvasRenderer {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {Object} options
   */
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;

    // Coordinate transform: model space → canvas space
    this.scale = options.scale || 300;
    this.offsetX = options.offsetX || this.width / 2;
    this.offsetY = options.offsetY || this.height / 2;

    // State
    this.quad = null;
    this.pathPts = null;
    this.framework = null;
    this.eoMetrics = null;

    // Interaction state
    this.hoveredPoint = null;
    this.draggedPoint = null;
    this.onStanceChange = null;
  }

  /**
   * Transform model coordinates to canvas coordinates.
   */
  toCanvas(pt) {
    return {
      x: this.offsetX + pt[0] * this.scale,
      y: this.offsetY - pt[1] * this.scale // Y flipped for canvas
    };
  }

  /**
   * Transform canvas coordinates to model coordinates.
   */
  toModel(canvasPt) {
    return [
      (canvasPt.x - this.offsetX) / this.scale,
      (this.offsetY - canvasPt.y) / this.scale
    ];
  }

  /**
   * Set the geometric stance data.
   */
  setStance(quad, pathPts, framework, eoMetrics) {
    this.quad = quad;
    this.pathPts = pathPts;
    this.framework = framework;
    this.eoMetrics = eoMetrics;
    this.render();
  }

  /**
   * Main render function.
   */
  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    this.drawGrid();

    if (this.quad) {
      this.drawQuadrilateral();
    }

    if (this.framework) {
      this.drawKerImDecomposition();
    }

    if (this.pathPts) {
      this.drawPath();
    }

    if (this.framework || this.eoMetrics) {
      this.drawMetricsOverlay();
    }

    this.drawZThreshold();
  }

  /**
   * Draw background grid.
   */
  drawGrid() {
    const ctx = this.ctx;
    ctx.strokeStyle = COLORS.GRID;
    ctx.lineWidth = 1;

    const step = this.scale * 0.2;
    for (let x = this.offsetX % step; x < this.width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }
    for (let y = this.offsetY % step; y < this.height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, this.offsetY);
    ctx.lineTo(this.width, this.offsetY);
    ctx.moveTo(this.offsetX, 0);
    ctx.lineTo(this.offsetX, this.height);
    ctx.stroke();
  }

  /**
   * Draw the containment quadrilateral Q.
   */
  drawQuadrilateral() {
    const ctx = this.ctx;
    const pts = this.quad.map(p => this.toCanvas(p));

    // Fill
    ctx.fillStyle = COLORS.Q_FILL;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.closePath();
    ctx.fill();

    // Stroke
    ctx.strokeStyle = COLORS.Q_STROKE;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Vertex labels
    ctx.fillStyle = COLORS.TEXT;
    ctx.font = '12px monospace';
    const labels = ['Q0', 'Q1', 'Q2', 'Q3'];
    for (let i = 0; i < pts.length; i++) {
      ctx.fillText(labels[i], pts[i].x + 5, pts[i].y - 5);
    }
  }

  /**
   * Draw im/ker area decomposition.
   */
  drawKerImDecomposition() {
    if (!this.framework) return;

    const ctx = this.ctx;
    const fw = this.framework;

    // Draw ker region (blocked by prior art)
    if (fw.kerPoly && fw.kerPoly.length > 2) {
      const kerPts = fw.kerPoly.map(p => this.toCanvas(p));
      ctx.fillStyle = COLORS.KER_FILL;
      ctx.beginPath();
      ctx.moveTo(kerPts[0].x, kerPts[0].y);
      for (let i = 1; i < kerPts.length; i++) {
        ctx.lineTo(kerPts[i].x, kerPts[i].y);
      }
      ctx.closePath();
      ctx.fill();

      // Label
      const centroid = this.polygonCentroid(kerPts);
      ctx.fillStyle = 'rgba(200,50,50,0.8)';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('ker', centroid.x - 12, centroid.y + 5);
    }

    // Draw im region (passes to novelty)
    if (fw.imPoly && fw.imPoly.length > 2) {
      const imPts = fw.imPoly.map(p => this.toCanvas(p));
      ctx.fillStyle = COLORS.IM_FILL;
      ctx.beginPath();
      ctx.moveTo(imPts[0].x, imPts[0].y);
      for (let i = 1; i < imPts.length; i++) {
        ctx.lineTo(imPts[i].x, imPts[i].y);
      }
      ctx.closePath();
      ctx.fill();

      // Label
      const centroid = this.polygonCentroid(imPts);
      ctx.fillStyle = 'rgba(50,150,50,0.8)';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('im', centroid.x - 8, centroid.y + 5);
    }
  }

  /**
   * Draw the L→E→R path.
   */
  drawPath() {
    const ctx = this.ctx;
    const [L, E, R] = this.pathPts.map(p => this.toCanvas(p));

    // L→E segment
    ctx.strokeStyle = COLORS.PATH_L;
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(L.x, L.y);
    ctx.lineTo(E.x, E.y);
    ctx.stroke();

    // E→R segment
    ctx.strokeStyle = COLORS.PATH_R;
    ctx.beginPath();
    ctx.moveTo(E.x, E.y);
    ctx.lineTo(R.x, R.y);
    ctx.stroke();

    // Draw points
    this.drawPoint(L, 'L', COLORS.PATH_L, this.hoveredPoint === 0);
    this.drawPoint(E, 'E', COLORS.PATH_E, this.hoveredPoint === 1);
    this.drawPoint(R, 'R', COLORS.PATH_R, this.hoveredPoint === 2);

    // Draw Pin/Pout intersection points if available
    if (this.framework) {
      if (this.framework.Pin) {
        const pin = this.toCanvas(this.framework.Pin);
        this.drawSmallPoint(pin, 'Pin', '#666');
      }
      if (this.framework.Pout) {
        const pout = this.toCanvas(this.framework.Pout);
        this.drawSmallPoint(pout, 'Pout', '#666');
      }
    }
  }

  /**
   * Draw a labeled point.
   */
  drawPoint(canvasPt, label, color, hovered) {
    const ctx = this.ctx;
    const radius = hovered ? 10 : 8;

    ctx.fillStyle = hovered ? COLORS.POINT_HOVER : color;
    ctx.beginPath();
    ctx.arc(canvasPt.x, canvasPt.y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, canvasPt.x, canvasPt.y);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  }

  /**
   * Draw a small unlabeled point.
   */
  drawSmallPoint(canvasPt, label, color) {
    const ctx = this.ctx;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(canvasPt.x, canvasPt.y, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = color;
    ctx.font = '10px monospace';
    ctx.fillText(label, canvasPt.x + 6, canvasPt.y - 6);
  }

  /**
   * Draw z_c threshold line (horizontal at z_c ≈ 0.866).
   */
  drawZThreshold() {
    const ctx = this.ctx;
    const zc = 0.866;
    const y = this.offsetY - zc * this.scale;

    ctx.strokeStyle = COLORS.THRESHOLD;
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(this.width, y);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = COLORS.THRESHOLD;
    ctx.font = '11px monospace';
    ctx.fillText('z_c = 0.866', 5, y - 3);
  }

  /**
   * Draw metrics overlay panel.
   */
  drawMetricsOverlay() {
    const ctx = this.ctx;
    const x = 10;
    let y = 20;
    const lineHeight = 16;

    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.fillRect(5, 5, 180, 160);
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.strokeRect(5, 5, 180, 160);

    ctx.fillStyle = COLORS.TEXT;
    ctx.font = 'bold 12px monospace';
    ctx.fillText('Geometric Stance', x, y);
    y += lineHeight + 4;

    ctx.font = '11px monospace';

    if (this.framework) {
      ctx.fillText(`compression: ${this.framework.compression?.toFixed(4) || 'N/A'}`, x, y);
      y += lineHeight;
      ctx.fillText(`deflection: ${this.framework.deflection ? (this.framework.deflection * 180 / Math.PI).toFixed(2) + '°' : 'N/A'}`, x, y);
      y += lineHeight;
      ctx.fillText(`kerNorm: ${this.framework.kerNorm?.toFixed(4) || 'N/A'}`, x, y);
      y += lineHeight;
      ctx.fillText(`imNorm: ${this.framework.imNorm?.toFixed(4) || 'N/A'}`, x, y);
      y += lineHeight;
      ctx.fillText(`centrality: ${this.framework.centrality?.toFixed(4) || 'N/A'}`, x, y);
      y += lineHeight;
    }

    if (this.eoMetrics) {
      ctx.fillText(`z: ${this.eoMetrics.z?.toFixed(4) || 'N/A'}`, x, y);
      y += lineHeight;
      ctx.fillText(`eta (η): ${this.eoMetrics.eta?.toFixed(4) || 'N/A'}`, x, y);
      y += lineHeight;
      ctx.fillText(`registered: ${this.eoMetrics.registered?.toFixed(4) || 'N/A'}`, x, y);
    }
  }

  /**
   * Compute centroid of canvas points.
   */
  polygonCentroid(pts) {
    let cx = 0, cy = 0;
    for (const p of pts) {
      cx += p.x;
      cy += p.y;
    }
    return { x: cx / pts.length, y: cy / pts.length };
  }

  /**
   * Find if a canvas point is near a path point.
   */
  findNearPoint(canvasPt, threshold = 15) {
    if (!this.pathPts) return -1;

    for (let i = 0; i < this.pathPts.length; i++) {
      const p = this.toCanvas(this.pathPts[i]);
      const dx = canvasPt.x - p.x;
      const dy = canvasPt.y - p.y;
      if (Math.sqrt(dx * dx + dy * dy) < threshold) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Handle mouse move for hover detection.
   */
  handleMouseMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    const canvasPt = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    if (this.draggedPoint !== null) {
      // Update dragged point
      const modelPt = this.toModel(canvasPt);
      this.pathPts[this.draggedPoint] = modelPt;
      if (this.onStanceChange) {
        this.onStanceChange(this.quad, this.pathPts);
      }
      this.render();
    } else {
      // Update hover state
      const near = this.findNearPoint(canvasPt);
      if (near !== this.hoveredPoint) {
        this.hoveredPoint = near;
        this.canvas.style.cursor = near >= 0 ? 'grab' : 'default';
        this.render();
      }
    }
  }

  /**
   * Handle mouse down for drag start.
   */
  handleMouseDown(event) {
    const rect = this.canvas.getBoundingClientRect();
    const canvasPt = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    const near = this.findNearPoint(canvasPt);
    if (near >= 0) {
      this.draggedPoint = near;
      this.canvas.style.cursor = 'grabbing';
    }
  }

  /**
   * Handle mouse up for drag end.
   */
  handleMouseUp() {
    if (this.draggedPoint !== null) {
      this.draggedPoint = null;
      this.canvas.style.cursor = this.hoveredPoint >= 0 ? 'grab' : 'default';
    }
  }

  /**
   * Attach event listeners for interactivity.
   */
  attachListeners() {
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.canvas.addEventListener('mouseup', () => this.handleMouseUp());
    this.canvas.addEventListener('mouseleave', () => this.handleMouseUp());
  }
}

// Export for browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CanvasRenderer, COLORS };
}
