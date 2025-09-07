# HTML Entity Encoding

## What is HTML Entity Encoding?

HTML entity encoding converts special characters to HTML-safe entity
representations (like `&amp;` for `&`) to ensure proper display and prevent
parsing issues.

## Why Entity Encoding?

- **Character Safety**: Ensures special characters display correctly
- **Internationalization**: Handles Swedish characters (å, ä, ö)
- **Cross-Browser Compatibility**: Prevents character corruption
- **Security**: Neutralizes potentially unsafe characters

## How it's used in this project

### Implementation

Custom build script `build-html-entities.js` processes HTML using the
`html-entities` package.

### Build Pipeline

Entity encoding runs before HTML minification:

```text
src/index.html → Entity Encoding → HTML Minification → docs/index.html
```

### Build Commands

```bash
npm run build:html      # Entity encoding + minification
npm run build:html:fast # Entity encoding only
```

### Characters Handled

- **Swedish Characters**: å, ä, ö, Å, Ä, Ö
- **Special Symbols**: Various punctuation and symbols
- **International Characters**: Unicode content
- **HTML Special Characters**: &, <, >, quotes

### Script Integration

The `build-html-entities.js` script:

1. Reads `src/index.html`
2. Processes content through html-entities encoder
3. Writes encoded content to `docs/index.html`
4. Prepares for final minification step

### Content Safety

Ensures portfolio content with international characters displays correctly
across all browsers and environments without compatibility issues or character
corruption.
