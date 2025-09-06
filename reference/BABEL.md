# Babel - JavaScript Transpiler

## What is Babel?

Babel is a JavaScript compiler that transforms modern ES6+ syntax into
backward-compatible JavaScript for older browsers. It allows developers to use
the latest JavaScript features while ensuring broad browser compatibility.

## Role in This Project

Babel serves as the first step in the JavaScript build pipeline, converting
modern ES6+ syntax to ES5-compatible code before Terser minification.

### Key Implementation Details

- **Package**: `@babel/core@^7.28.4`, `@babel/cli@^7.28.3`,
  `@babel/preset-env@^7.28.3`
- **Configuration**: `.babelrc` with `@babel/preset-env` preset
- **Build Script**:
  `"build:js": "babel src/scripts --out-dir docs/scripts --presets=@babel/preset-env && terser docs/scripts/app.js -o docs/scripts/app.js --compress --mangle"`
- **Watch Script**:
  `"watch:js": "babel src/scripts --out-dir docs/scripts --presets=@babel/preset-env --watch"`
- **Input**: `src/scripts/app.js`
- **Output**: `docs/scripts/app.js` (ES5 compatible)

### Project-Specific Benefits

- **Modern Syntax**: Use ES6+ features like arrow functions, const/let, template
  literals
- **Browser Compatibility**: Ensures code works in older browsers including IE11
- **Progressive Enhancement**: Latest features while maintaining backward
  compatibility
- **Automatic Transpilation**: Smart preset detects which features need
  conversion
