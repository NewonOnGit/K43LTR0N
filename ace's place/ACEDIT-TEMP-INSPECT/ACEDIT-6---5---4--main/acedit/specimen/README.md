# ACEDIT Font Specimen

Interactive specimen page displaying all 1,094 PUA glyphs organized by block.

## Usage

Open `index.html` directly in a browser, or serve through the orchestration server:

```bash
# Direct
open specimen/index.html

# Via server
python3 server.py   # then visit http://localhost:5618/acedit/specimen/index.html
```

## Requirements

The specimen page loads `ACEDIT-Regular.woff2` from `../fonts/`. If the font has not been compiled, the page will show codepoint placeholders instead of rendered glyphs.

## Hosted

When deployed to GitHub Pages:
```
https://echo-s-studios.github.io/ACEDIT-6---5---4-/acedit/specimen/index.html
```
