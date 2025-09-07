# Build System

The build system is a custom Node.js pipeline that transforms source files into
optimized production assets for GitHub Pages deployment.

## What It Does

Converts source files in `src/` into optimized production files in `docs/` with
automated validation, compression, and performance optimization.

## Why This Approach

- **GitHub Pages compatibility**: Outputs to `/docs` directory for automatic
  deployment
- **Performance focus**: Aggressive optimization for 90+ Lighthouse scores
- **Build validation**: Prevents broken deployments with automated testing
- **Development speed**: Fast builds for development, full optimization for
  production

## Build Manager

The core build orchestrator is `build/build-manager.js` which coordinates all
build steps.

### Build Types

**Fast Build** (`node build/build-manager.js fast`)

- Development mode with source maps
- No minification or validation
- Skips PNG optimization and favicon generation
- ~2-3 seconds build time

**Full Build** (`npm run build`)

- Production mode with full optimization
- All compression, minification, and validation
- Includes PNG optimization and favicon generation
- ~10-15 seconds build time

## Build Pipeline Flow

### Fast Build (Development)

1. **Clean** - Remove previous build artifacts
2. **CSS** - Sass compilation with source maps
3. **JS** - Babel transpilation only
4. **HTML** - HTML entity encoding only
5. **Service Worker** - Basic cache updates
6. **Static Files** - Copy static assets

### Full Build (Production)

1. **Clean** - Remove previous build artifacts
2. **PNG Optimize** - Optimize source PNG images
3. **CSS** - Sass → PostCSS (autoprefixer, cssnano)
4. **JS** - Babel → Terser minification
5. **HTML** - Entity encoding → HTML minification
6. **Favicons** - Generate all favicon formats with Sharp
7. **Service Worker** - PWA cache updates
8. **Static Files** - Copy and optimize static assets
9. **Validation** - HTML validation + Jest test suite

## Build Scripts

### Core Build Scripts

**`build/build-manager.js`**

- Main build orchestrator
- Handles build type selection
- Provides colored console output with timing
- Exits on any step failure

**`build/build-png-optimizer.js`**

- Optimizes PNG files using Sharp
- Smart compression strategies based on file size
- Preserves originals if optimization doesn't help
- Configurable progressive encoding via `PNG_PROGRESSIVE=true` environment
  variable
- Centralized palette compression logic via `getPaletteSettings()` helper method

**`build/build-favicons-sharp.js`**

- Generates 9 professional favicon formats
- PWA manifest and maskable icons
- SVG optimization with theme switching

**`build/build-html-entities.js`**

- Encodes HTML entities for security
- Prevents XSS and encoding issues

**`build/build-service-worker.js`**

- Generates PWA service worker
- Cache invalidation and versioning

**`build/build-static.js`**

- Copies static files (robots.txt, sitemap.xml)
- Optimizes static SVG files

**`build/build-svg-optimizer.js`**

- SVGO-based SVG optimization
- Favicon-specific optimizations

## Configuration Files

**`babel.config.js`**

- ES5 target for maximum compatibility
- Core-js polyfills for older browsers

**`postcss.config.js`**

- Autoprefixer for vendor prefixes
- cssnano for CSS minification

**`jest.config.js`**

- Test environment configuration
- 80% coverage threshold

## Build Integration

### Development Workflow

```bash
npm run dev          # Live server + file watching
npm run watch        # File watchers only
npm run watch:css    # Sass file watcher
npm run watch:js     # Babel file watcher
```

### Production Workflow

```bash
npm run build        # Full production build
npm run validate     # HTML validation + tests
npm run size         # Build output analysis
```

### Optimization Tools

```bash
npm run png:optimize # Standalone PNG optimization
npm run svg:optimize # Standalone SVG optimization
npm run lint         # Code quality checks
npm run pretty       # Code formatting
```

## Build Validation

### HTML Validation

- Standards compliance checking
- Accessibility validation
- SEO best practices

### Jest Testing

- Build artifact validation
- Content integrity checks
- Performance regression testing
- 80% code coverage requirement

### Performance Monitoring

The build system includes comprehensive performance monitoring and optimization
insights:

#### Build Performance Report

Every build generates a detailed performance report showing:

- **Step-by-step timing**: Duration and percentage of total build time for each
  step
- **Bottleneck identification**: Highlights the slowest build steps
- **Compression metrics**: Before/after file sizes with compression ratios
- **Size budget analysis**: Compares output sizes against defined budgets
- **Performance warnings**: Alerts for steps taking longer than 5 seconds

#### Build History Tracking

Build performance data is automatically saved to `.build-history.json`:

- **Trend analysis**: Track build performance over time
- **Size monitoring**: Monitor build output size changes
- **Regression detection**: Identify performance degradation

#### Build History Commands

```bash
# View recent builds
node build/build-history.js recent [count]

# Show performance trends
node build/build-history.js trends

# Analyze size changes
node build/build-history.js size

# Comprehensive report
node build/build-history.js all
```

#### Size Budget Thresholds

- **Total build output**: 5MB
- **CSS files**: 100KB
- **JavaScript files**: 200KB
- **HTML files**: 50KB

#### Performance Optimization Features

- **File compression tracking**: Real-time compression ratios for CSS, JS, and
  HTML
- **PNG optimization**: Automatic PNG compression with size reporting
- **SVG optimization**: Static SVG file optimization with size reduction metrics
- **Build timing analysis**: Identifies slow steps for optimization
  opportunities

- Lighthouse integration
- Core Web Vitals tracking
- File size monitoring

## Error Handling

The build system fails fast on any error:

1. **Build step failures** - Exit immediately with error code
2. **Validation failures** - Prevent deployment of broken builds
3. **Test failures** - Block production builds
4. **Dependency issues** - Clear error messages

## Build Output

### File Structure

```text
docs/
├── index.html           # Minified HTML
├── styles/main.css      # Compressed CSS
├── scripts/app.js       # Minified JavaScript
├── favicon.ico          # Legacy favicon
├── icon-*.png          # Various favicon sizes
├── icon.svg            # Vector favicon with themes
├── site.webmanifest    # PWA configuration
├── sw.js               # Service worker
├── robots.txt          # SEO directives
└── sitemap.xml         # Search engine sitemap
```

### File Size Targets

- **HTML**: ~18KB (minified)
- **CSS**: ~3KB (compressed)
- **JS**: ~5KB (minified)
- **Favicons**: 0.4KB - 8KB (optimized)

## GitHub Pages Integration

### Deployment Process

1. Push to main branch triggers GitHub Actions
2. GitHub Pages serves from `/docs` directory
3. Build artifacts are pre-optimized for production
4. Service worker enables offline functionality

### Deployment Validation

- HTML standards compliance
- Performance score validation
- Asset optimization verification
- PWA manifest validation

## Performance Optimizations

### CSS Optimizations

- Sass compilation with optimization
- PostCSS autoprefixer and minification
- Critical CSS inlining
- Font loading optimization

### JavaScript Optimizations

- Babel ES5 transpilation
- Terser minification and mangling
- Dead code elimination
- Bundle size monitoring

### Image Optimizations

- Sharp-based PNG compression
- SVGO vector optimization
- WebP format consideration
- Responsive image sizing
- Configurable progressive PNG encoding (disabled by default for maximum
  compression)

### HTML Optimizations

- Minification with attribute removal
- Entity encoding for security
- Meta tag optimization
- Semantic markup validation

## Build Performance

### Timing Benchmarks

- **Fast build**: 2-3 seconds
- **Full build**: 10-15 seconds
- **Test suite**: 5-7 seconds
- **Validation**: 1-2 seconds

### Build Caching

- Node.js module caching
- Incremental compilation when possible
- Build artifact preservation
- Dependency change detection

## Troubleshooting

### Common Issues

- **Sass compilation errors**: Check SCSS syntax
- **Babel transpilation failures**: Verify ES6+ syntax
- **Sharp image processing**: Ensure valid image formats
- **Jest test failures**: Check test assertions

### Debug Commands

```bash
npm run build --verbose    # Detailed build output
npm test --verbose         # Detailed test output
npm run validate          # Full validation suite
npm run size              # File size analysis
```

This build system ensures reliable, optimized, and validated deployments while
maintaining fast development iteration cycles.
