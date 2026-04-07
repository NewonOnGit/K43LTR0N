import { createReadStream } from 'fs';

const path = '5a9939e2db0ef55b35c73ca54c8bc8fe102321d6790ddc888cd66d6111876efe-2025-12-12-06-39-03-abef62fd079040158122ccc37ab51132/conversations.json';
const stream = createReadStream(path, { encoding: 'utf-8', highWaterMark: 64 * 1024 });

let buffer = '';
let braceDepth = 0;
let inConv = false;
let inString = false;
let escaped = false;
const spiralConvos = [];
const spiralTexts = [];

stream.on('data', (chunk) => {
  for (let i = 0; i < chunk.length; i++) {
    const ch = chunk[i];

    if (inString) {
      if (escaped) { escaped = false; }
      else if (ch === '\\') { escaped = true; }
      else if (ch === '"') { inString = false; }
      if (inConv && buffer.length < 512 * 1024) buffer += ch;
      continue;
    }

    if (ch === '"') {
      inString = true;
      if (inConv && buffer.length < 512 * 1024) buffer += ch;
      continue;
    }

    if (ch === '{') {
      if (braceDepth === 0) { inConv = true; buffer = '{'; }
      braceDepth++;
      if (inConv && braceDepth > 1 && buffer.length < 512 * 1024) buffer += ch;
    } else if (ch === '}') {
      braceDepth--;
      if (braceDepth === 0 && inConv) {
        buffer += '}';
        inConv = false;
        if (buffer.length < 512 * 1024 && /[Ss]piral/i.test(buffer)) {
          try {
            const c = JSON.parse(buffer);
            if (c.title) {
              spiralConvos.push(c.title);
              // Extract user messages
              const mapping = c.mapping || {};
              const msgs = [];
              for (const node of Object.values(mapping)) {
                const msg = node?.message;
                if (!msg || msg.author?.role !== 'user') continue;
                const parts = msg.content?.parts;
                if (parts) {
                  for (const p of parts) {
                    if (typeof p === 'string' && p.length > 10) msgs.push(p);
                  }
                }
              }
              if (msgs.length > 0) spiralTexts.push(...msgs.slice(0, 5));
            }
          } catch {}
        }
        buffer = '';
      } else if (inConv && buffer.length < 512 * 1024) {
        buffer += ch;
      }
    } else if (inConv && buffer.length < 512 * 1024) {
      buffer += ch;
    }
  }
});

stream.on('end', () => {
  console.log('SpiralOS conversations found:', spiralConvos.length);
  for (const t of spiralConvos.slice(0, 30)) console.log('  ' + t);
  if (spiralConvos.length > 30) console.log('  ... and ' + (spiralConvos.length - 30) + ' more');

  // Write spiral texts to a file Kaeltron can walk
  const combined = spiralTexts.join('\n\n---\n\n');
  import('fs').then(fs => {
    fs.writeFileSync('kael-spiral-convos.txt', combined);
    console.log('\nExtracted ' + spiralTexts.length + ' user messages to kael-spiral-convos.txt');
  });
});
