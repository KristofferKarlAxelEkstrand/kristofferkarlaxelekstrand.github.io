# Terser

## What is Terser?

Terser is a JavaScript minifier that compresses code by removing whitespace,
shortening variable names, and eliminating dead code.

## Why Terser?

- **File Size Reduction**: 60-80% smaller JavaScript bundles
- **Performance**: Faster page loading and parsing
- **Production Optimization**: Essential for deployment efficiency
- **Standards Compliance**: Maintains functionality while optimizing

## How it's used in this project

### Pipeline Position

Terser runs after Babel transpilation as the final optimization step:

```text
src/scripts/app.js → Babel → Terser → docs/scripts/app.js
```

### Build Commands

```bash
npm run build:js      # Production: Babel + Terser minification
npm run build:js:fast # Development: Babel only (no minification)
```

### Optimization Settings

- **Compress**: Removes dead code and collapses statements
- **Mangle**: Shortens variable and function names
- **Preserves**: Required function signatures and APIs

### Configuration

Integrated via npm scripts with these options:

```bash
terser docs/scripts/app.js -o docs/scripts/app.js --compress --mangle
```

### Performance Impact

- **Size Reduction**: Typically 60-80% smaller than unminified code
- **Load Time**: Significantly faster page loading
- **Parse Speed**: Faster JavaScript execution

The minification ensures optimal performance for the GitHub Pages deployment
while maintaining all functionality of the original source code.
