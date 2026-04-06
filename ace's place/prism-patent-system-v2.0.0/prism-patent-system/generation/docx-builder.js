/**
 * generation/docx-builder.js
 *
 * Patent Specification .docx Generator
 *
 * V2 UPDATE: Adds geometric stance visualization section and closure state reporting.
 *
 * Accepts the complete generated specification (all 9 sections)
 * and produces a properly formatted .docx with headings, numbered claims,
 * tables, and page numbers using docx-js.
 *
 * @module generation/docx-builder
 */

'use strict';

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle,
  WidthType, ShadingType, PageNumber, PageBreak
} = require('docx');

const fs = require('fs');

/**
 * Build a patent specification .docx from a document schema.
 *
 * @param {Object} documentSchema - The L8 document schema
 * @param {string} outputPath - File path for the output .docx
 * @returns {Promise<Buffer>} The .docx buffer
 */
async function buildDocx(documentSchema, outputPath) {
  if (!documentSchema) {
    throw new Error('buildDocx: documentSchema is required');
  }

  const children = [];

  // ─── TITLE ────────────────────────────────────────────────────────────
  children.push(new Paragraph({
    heading: HeadingLevel.TITLE,
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: documentSchema.title || 'Untitled Patent Specification', bold: true, size: 32 })]
  }));

  children.push(new Paragraph({ children: [] })); // spacer

  // ─── ABSTRACT ─────────────────────────────────────────────────────────
  children.push(new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text: 'ABSTRACT', bold: true })]
  }));
  children.push(new Paragraph({
    children: [new TextRun({ text: documentSchema.abstract || '' })]
  }));

  // ─── TECHNICAL FIELD ──────────────────────────────────────────────────
  children.push(new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text: 'TECHNICAL FIELD', bold: true })]
  }));
  children.push(new Paragraph({
    children: [new TextRun({ text: documentSchema.technical_field || '' })]
  }));

  // ─── BACKGROUND ───────────────────────────────────────────────────────
  children.push(new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text: 'BACKGROUND OF THE INVENTION', bold: true })]
  }));

  if (documentSchema.background && typeof documentSchema.background === 'object') {
    children.push(new Paragraph({
      children: [new TextRun({ text: documentSchema.background.summary || '' })]
    }));

    if (documentSchema.background.prior_art && documentSchema.background.prior_art.length > 0) {
      children.push(new Paragraph({
        children: [new TextRun({ text: 'Prior art references: ' + documentSchema.background.prior_art.join('; ') + '.' })]
      }));
    }

    if (documentSchema.background.tension_points && documentSchema.background.tension_points.length > 0) {
      for (const tp of documentSchema.background.tension_points) {
        children.push(new Paragraph({
          children: [new TextRun({ text: `The prior art fails to address: ${tp.description} (significance: ${(tp.severity * 100).toFixed(0)}%).` })]
        }));
      }
    }

    // V2: ker/im decomposition analysis
    if (documentSchema.background.ker_im_analysis) {
      const kia = documentSchema.background.ker_im_analysis;
      children.push(new Paragraph({
        spacing: { before: 200 },
        children: [new TextRun({
          text: `Geometric analysis reveals a ker/im decomposition: ${(kia.kerNorm * 100).toFixed(1)}% of claim space blocked by prior art (ker), ${(kia.imNorm * 100).toFixed(1)}% passes through to novelty (im).`
        })]
      }));
    }
  } else {
    children.push(new Paragraph({
      children: [new TextRun({ text: String(documentSchema.background || '') })]
    }));
  }

  // ─── SUMMARY ──────────────────────────────────────────────────────────
  children.push(new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text: 'SUMMARY OF THE INVENTION', bold: true })]
  }));

  if (documentSchema.summary && typeof documentSchema.summary === 'object') {
    children.push(new Paragraph({
      children: [new TextRun({ text: documentSchema.summary.overview || '' })]
    }));

    if (documentSchema.summary.emergent_claims) {
      for (const claim of documentSchema.summary.emergent_claims) {
        children.push(new Paragraph({
          children: [new TextRun({ text: `The present invention provides: ${claim}.` })]
        }));
      }
    }

    // V2: z-coordinate position
    if (documentSchema.summary.z_position !== undefined) {
      const z = documentSchema.summary.z_position;
      const zc = 0.866; // z_c threshold
      const relation = z > zc ? 'above' : z < zc ? 'below' : 'at';
      children.push(new Paragraph({
        spacing: { before: 200 },
        children: [new TextRun({
          text: `The observer's z-coordinate (${z.toFixed(4)}) positions the invention ${relation} the novelty threshold (z_c = ${zc}), indicating ${z > zc ? 'high' : 'moderate'} patentability potential.`
        })]
      }));
    }
  } else {
    children.push(new Paragraph({
      children: [new TextRun({ text: String(documentSchema.summary || '') })]
    }));
  }

  // ─── DETAILED DESCRIPTION ─────────────────────────────────────────────
  children.push(new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text: 'DETAILED DESCRIPTION OF PREFERRED EMBODIMENTS', bold: true })]
  }));

  if (documentSchema.detailed_description && typeof documentSchema.detailed_description === 'object') {
    const dd = documentSchema.detailed_description;

    if (dd.substrate) {
      children.push(new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: 'System Architecture', bold: true })]
      }));
      children.push(new Paragraph({
        children: [new TextRun({
          text: `The system operates within a prior art landscape of ${dd.substrate.zoneCount} categories and ${dd.substrate.electrodeCount} specific references, with a novelty threshold of ${dd.substrate.noveltyThreshold.toFixed(4)}.`
        })]
      }));
    }

    // V2: Geometric Stance Analysis
    if (dd.geometric_stance) {
      const gs = dd.geometric_stance;
      children.push(new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: 'Geometric Stance Analysis', bold: true })]
      }));

      children.push(new Paragraph({
        children: [new TextRun({
          text: `The observer interior architecture positions the inventor within the containment domain Q (prior art landscape). The L→E→R path traces the trajectory from latent conception through exploration to registered claims.`
        })]
      }));

      if (gs.compression !== undefined) {
        children.push(new Paragraph({
          children: [new TextRun({
            text: `Compression ratio: ${gs.compression.toFixed(4)} — representing the claim scope compression as concepts pass through the observer.`
          })]
        }));
      }

      if (gs.deflection !== undefined) {
        children.push(new Paragraph({
          children: [new TextRun({
            text: `Deflection angle: ${(gs.deflection * 180 / Math.PI).toFixed(2)}° — the angular shift in claim framing during prosecution.`
          })]
        }));
      }

      if (gs.kerNorm !== undefined && gs.imNorm !== undefined) {
        children.push(new Paragraph({
          children: [new TextRun({
            text: `ker/im decomposition: ker=${gs.kerNorm.toFixed(4)} (blocked by prior art), im=${gs.imNorm.toFixed(4)} (passes to novelty).`
          })]
        }));
      }

      if (gs.centrality !== undefined) {
        children.push(new Paragraph({
          children: [new TextRun({
            text: `Centrality: ${gs.centrality.toFixed(4)} — observer position relative to Q centroid.`
          })]
        }));
      }
    }

    if (dd.field_signature) {
      children.push(new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: 'Field Signature Analysis', bold: true })]
      }));
      for (const [key, value] of Object.entries(dd.field_signature)) {
        children.push(new Paragraph({
          children: [new TextRun({
            text: `${key}: ${typeof value === 'number' ? value.toFixed(4) : value}`
          })]
        }));
      }
    }

    // V2: Closure State
    if (dd.closure_state) {
      const cs = dd.closure_state;
      children.push(new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: 'Algebraic Closure Analysis', bold: true })]
      }));

      children.push(new Paragraph({
        children: [new TextRun({
          text: `Extension admitted: ${cs.extAdmitted ? 'Yes' : 'No'} — at least one claim element survived the narrowing pipeline.`
        })]
      }));

      children.push(new Paragraph({
        children: [new TextRun({
          text: `Unique closure: ${cs.uniqueClosure ? 'Yes' : 'No'} — claim set is ${cs.uniqueClosure ? 'algebraically consistent' : 'INCONSISTENT (requires review)'}.`
        })]
      }));

      if (cs.k4Deficit !== undefined) {
        children.push(new Paragraph({
          children: [new TextRun({
            text: `K4 algebraic deficit: ${cs.k4Deficit.toFixed(4)}${cs.k4Deficit > 0.8 ? ' [THRESHOLD EXCEEDED]' : ''}`
          })]
        }));
      }

      if (cs.sigmaR !== undefined) {
        children.push(new Paragraph({
          children: [new TextRun({
            text: `Signal rupture (σ_R): ${cs.sigmaR.toFixed(4)}${cs.sigmaR >= 0.74 ? ' [THRESHOLD EXCEEDED]' : ''}`
          })]
        }));
      }

      if (cs.recommendation) {
        children.push(new Paragraph({
          spacing: { before: 100 },
          children: [new TextRun({
            text: `Recommendation: ${cs.recommendation}`,
            italics: true
          })]
        }));
      }
    }

    if (dd.integrity_score !== undefined) {
      children.push(new Paragraph({
        spacing: { before: 200 },
        children: [new TextRun({
          text: `Overall patentability integrity score: ${dd.integrity_score.toFixed(4)}.`,
          bold: true
        })]
      }));
    }
  }

  // ─── CLAIMS ───────────────────────────────────────────────────────────
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text: 'CLAIMS', bold: true })]
  }));
  children.push(new Paragraph({
    children: [new TextRun({ text: 'What is claimed is:' })]
  }));

  // Independent claims
  let claimNum = 1;
  for (const claim of (documentSchema.independent_claims || [])) {
    children.push(new Paragraph({
      spacing: { before: 200, after: 100 },
      children: [
        new TextRun({ text: `${claimNum}. `, bold: true }),
        new TextRun({ text: claim.text })
      ]
    }));
    claimNum++;
  }

  // Dependent claims
  for (const claim of (documentSchema.dependent_claims || [])) {
    children.push(new Paragraph({
      spacing: { before: 200, after: 100 },
      children: [
        new TextRun({ text: `${claimNum}. `, bold: true }),
        new TextRun({ text: claim.text || claim.additional_limitation || '' })
      ]
    }));
    claimNum++;
  }

  // ─── DRAWINGS ─────────────────────────────────────────────────────────
  children.push(new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text: 'BRIEF DESCRIPTION OF THE DRAWINGS', bold: true })]
  }));

  // V2: Standard figures
  const v2Figures = [
    { figure: 'FIG. 1', description: 'a diagram showing the containment domain Q with the observer path L→E→R' },
    { figure: 'FIG. 2', description: 'a block diagram of the ten-layer signal processing pipeline (L0-L9)' },
    { figure: 'FIG. 3', description: 'a state diagram of the filing strategy routing FSM (PLAY/WARNING/BUFFER/HARBOR)' },
    { figure: 'FIG. 4', description: 'a visualization of the geometric stance with im/ker area decomposition' }
  ];

  const drawingsList = documentSchema.drawings_descriptions && documentSchema.drawings_descriptions.length > 0
    ? documentSchema.drawings_descriptions
    : v2Figures;

  for (const drawing of drawingsList) {
    children.push(new Paragraph({
      children: [new TextRun({
        text: `${drawing.figure} is ${drawing.description}.`
      })]
    }));
  }

  // ─── CONSTANTS TABLE ──────────────────────────────────────────────────
  if (documentSchema.constants_equations && documentSchema.constants_equations.length > 0) {
    children.push(new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun({ text: 'CONSTANTS AND EQUATIONS', bold: true })]
    }));

    const border = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
    const borders = { top: border, bottom: border, left: border, right: border };
    const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

    // Header row
    const headerRow = new TableRow({
      children: [
        new TableCell({
          borders, width: { size: 2000, type: WidthType.DXA },
          margins: cellMargins,
          shading: { fill: 'D5E8F0', type: ShadingType.CLEAR },
          children: [new Paragraph({ children: [new TextRun({ text: 'Symbol', bold: true })] })]
        }),
        new TableCell({
          borders, width: { size: 2000, type: WidthType.DXA },
          margins: cellMargins,
          shading: { fill: 'D5E8F0', type: ShadingType.CLEAR },
          children: [new Paragraph({ children: [new TextRun({ text: 'Value', bold: true })] })]
        }),
        new TableCell({
          borders, width: { size: 5360, type: WidthType.DXA },
          margins: cellMargins,
          shading: { fill: 'D5E8F0', type: ShadingType.CLEAR },
          children: [new Paragraph({ children: [new TextRun({ text: 'Description', bold: true })] })]
        })
      ]
    });

    const dataRows = documentSchema.constants_equations.map(c =>
      new TableRow({
        children: [
          new TableCell({
            borders, width: { size: 2000, type: WidthType.DXA }, margins: cellMargins,
            children: [new Paragraph({ children: [new TextRun({ text: c.symbol || '' })] })]
          }),
          new TableCell({
            borders, width: { size: 2000, type: WidthType.DXA }, margins: cellMargins,
            children: [new Paragraph({ children: [new TextRun({ text: String(c.value || '') })] })]
          }),
          new TableCell({
            borders, width: { size: 5360, type: WidthType.DXA }, margins: cellMargins,
            children: [new Paragraph({ children: [new TextRun({ text: c.description || '' })] })]
          })
        ]
      })
    );

    children.push(new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: [2000, 2000, 5360],
      rows: [headerRow, ...dataRows]
    }));
  }

  // ─── BUILD DOCUMENT ───────────────────────────────────────────────────
  const doc = new Document({
    styles: {
      default: {
        document: { run: { font: 'Arial', size: 24 } }
      },
      paragraphStyles: [
        {
          id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal',
          quickFormat: true,
          run: { size: 28, bold: true, font: 'Arial' },
          paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 }
        },
        {
          id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal',
          quickFormat: true,
          run: { size: 26, bold: true, font: 'Arial' },
          paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 1 }
        }
      ]
    },
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: 'PATENT SPECIFICATION — DRAFT', italics: true, size: 18, color: '888888' })]
          })]
        })
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: 'Page ', size: 18 }),
              new TextRun({ children: [PageNumber.CURRENT], size: 18 })
            ]
          })]
        })
      },
      children
    }]
  });

  const buffer = await Packer.toBuffer(doc);

  if (outputPath) {
    fs.writeFileSync(outputPath, buffer);
  }

  return buffer;
}

module.exports = { buildDocx };
