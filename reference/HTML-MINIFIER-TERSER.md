# HTML Minifier Terser

## What is HTML Minifier Terser?

HTML Minifier Terser optimizes HTML by removing whitespace, comments, and
redundant attributes while minifying embedded CSS and JavaScript.

## Why HTML Minification?

- **File Size Reduction**: 20-30% smaller HTML files
- **Performance**: Faster page loading and parsing
- **Bandwidth Efficiency**: Critical for GitHub Pages deployment
- **Production Quality**: Professional optimization standards

## How it's used in this project

### Build Pipeline

HTML minification runs after entity encoding:

```text
src/index.html → Entity Encoding → HTML Minification → docs/index.html
```

### Build Commands

```bash
npm run build:html      # Production: Entity encoding + minification
npm run build:html:fast # Development: Entity encoding only
```

### Optimization Settings

- **--collapse-whitespace**: Removes unnecessary whitespace
- **--remove-redundant-attributes**: Strips default HTML attributes
- **--minify-js**: Compresses inline JavaScript
- **--minify-css**: Compresses inline CSS

### Configuration

Processes all HTML files in the `docs/` directory:

```bash
html-minifier-terser --input-dir docs --output-dir docs --file-ext html
```

### Performance Impact

- **Size Reduction**: Typically 20-30% smaller files
- **Load Speed**: Faster initial page rendering
- **Bandwidth**: Reduced data transfer

### Quality Preservation

- Maintains semantic HTML structure
- Preserves accessibility attributes
- Keeps functionality intact
- Ensures standards compliance

The minification step ensures production-ready HTML that loads efficiently while
maintaining all functionality and accessibility standards.
