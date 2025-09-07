# Concurrently

## What is Concurrently?

Concurrently runs multiple npm scripts in parallel within a single terminal,
displaying color-coded output for each process.

## Why Concurrently?

- **Parallel Processing**: Run multiple build tasks simultaneously
- **Development Efficiency**: Combine file watching with local server
- **Build Optimization**: Reduce total build time through parallelization
- **Visual Clarity**: Color-coded output distinguishes between processes

## How it's used in this project

### Development Workflow

```bash
npm run dev  # Combines watch + serve
concurrently "npm run watch" "serve docs"
```

- **Watch mode**: Live CSS/JS compilation
- **Local server**: Serves `docs/` on localhost:3000
- **Hot reload**: Instant preview of changes

### Build Pipeline

Used in `build-manager.js` for parallel builds:

```bash
concurrently "npm run build:css" "npm run build:js"
```

- **CSS Pipeline**: Sass → PostCSS → minification
- **JS Pipeline**: Babel → Terser minification
- **Performance**: ~50% faster than sequential builds

### Watch Tasks

```bash
npm run watch
concurrently "npm run watch:css" "npm run watch:js"
```

- **CSS watching**: SCSS file changes trigger automatic compilation
- **JS watching**: JavaScript transpilation on file save
- **Simultaneous**: Both processes run in parallel

The tool eliminates the need for multiple terminal windows and provides a
streamlined development experience with clear visual feedback.
