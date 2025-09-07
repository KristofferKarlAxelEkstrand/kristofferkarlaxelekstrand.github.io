# Babel

## What is Babel?

Babel is a JavaScript compiler that transforms modern JavaScript code into
backwards-compatible versions for older browsers.

## Why Babel?

- **Browser Compatibility**: Ensures modern JavaScript works in older browsers
- **Future-Proof**: Use latest JavaScript features without waiting for browser
  support
- **Polyfills**: Automatically includes necessary polyfills via core-js

## How it's used in this project

### Configuration

The project uses `babel.config.js` with these settings:

- **Target**: Modern browsers (> 1%, last 2 versions, not IE11)
- **Modules**: Set to `false` to preserve ES6 modules
- **Polyfills**: `useBuiltIns: 'usage'` with core-js 3.0

### Build Process

```bash
npm run build:js     # Production: Babel + Terser minification
npm run build:js:fast # Development: Babel only
npm run watch:js     # Watch mode for development
```

### Output

- **Source**: `src/scripts/app.js`
- **Output**: `docs/scripts/app.js`
- **Pipeline**: ES6+ → ES5 compatible → Minified (production)

The build process ensures the JavaScript works reliably across all supported
browsers while maintaining modern development practices in the source code.
