/**
 * generation/docx-builder.js
 * 
 * Patent Specification .docx Generator
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
  WidthType, ShadingType, PageNumber, PageBreak, LevelFormat
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

    if (dd.integrity_score !== undefined) {
      children.push(new Paragraph({
        children: [new TextRun({
          text: `Overall patentability integrity score: ${dd.integrity_score.toFixed(4)}.`
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

  for (const drawing of (documentSchema.drawings_descriptions || [])) {
    children.push(new Paragraph({
      children: [new TextRun({
        text: `${drawing.figure} is a ${drawing.description}.`
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
