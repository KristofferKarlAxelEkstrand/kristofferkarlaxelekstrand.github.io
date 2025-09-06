# Terser - JavaScript Minification

## What is Terser?

Terser is a JavaScript parser, mangler, and compressor toolkit for ES6+. It's
the successor to UglifyJS and is specifically designed to handle modern
JavaScript syntax.

## Role in This Project

Terser serves as the final step in the JavaScript build pipeline, minifying
Babel-transpiled code for production. It removes dead code, simplifies
expressions, and shortens variable names to reduce file size.

### Key Implementation Details

- **Package**: `terser@^5.44.0`
- **Build Script**:
  `"build:js": "babel src/scripts --out-dir docs/scripts --presets=@babel/preset-env && terser docs/scripts/app.js -o docs/scripts/app.js --compress --mangle"`
- **Input**: `docs/scripts/app.js` (after Babel transpilation)
- **Output**: `docs/scripts/app.js` (minified)
- **Options**: `--compress` (removes dead code) and `--mangle` (shortens names)

### Project-Specific Benefits

- **File Size Reduction**: JavaScript files reduced by ~50% (4KB → 2KB)
- **Faster Loading**: Improved page performance and Core Web Vitals
- **Bandwidth Savings**: Less data transfer for users
- **Production Optimization**: Removes whitespace, comments, and unused code
