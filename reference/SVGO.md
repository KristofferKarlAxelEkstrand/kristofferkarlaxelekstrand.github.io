# SVGO Integration Guide

This project uses SVGO (SVG Optimizer) to automatically compress SVG files
during the build process, ensuring minimal file sizes for better performance.

## What SVGO Does

SVGO optimizes SVG files by:

- Removing unnecessary metadata and comments
- Simplifying path data and shapes
- Optimizing colors and gradients
- Removing unused definitions
- Minifying the SVG markup
- Preserving essential attributes for functionality

## Integration in This Project

### Automatic Optimization

SVG files are automatically optimized in two places:

1. **Static Files**: All `.svg` files in `static/` directory
2. **Favicon SVGs**: Logo SVGs in `src/assets/` during favicon generation

### Build Integration

- **Full Build**: `npm run build` includes SVG optimization
- **Fast Build**: `node build/build-manager.js fast` includes SVG optimization
- **Standalone**: `npm run svg:optimize` runs optimization only

### Configuration

The SVGO configuration is optimized for this project:

```javascript
{
  plugins: [
    'preset-default',
    {
      name: 'removeViewBox',
      active: false, // Keep viewBox for responsive scaling
    },
    {
      name: 'removeDimensions',
      active: true, // Remove width/height for responsive scaling
    },
    {
      name: 'removeTitle',
      active: false, // Keep titles for accessibility
    },
    {
      name: 'removeDesc',
      active: false, // Keep descriptions for accessibility
    },
    {
      name: 'cleanupIds',
      params: {
        minify: true,
        prefix: 'svg-',
      },
    },
    {
      name: 'convertColors',
      params: {
        currentColor: true,
      },
    },
  ],
}
```

## Favicon-Specific Optimization

For favicon SVGs, additional processing:

- Preserves CSS theme support (`prefers-color-scheme`)
- Adds accessibility attributes
- Maintains responsive viewBox
- Optimizes for small sizes

## File Processing

### Input Files

- `static/*.svg` → Optimized and copied to `docs/`
- `src/assets/logo.svg` → Optimized during favicon generation

### Output

- Original files remain unchanged
- Optimized versions written to `docs/`
- Build console shows compression statistics

## Build Console Output

```text
 BUILD  Optimizing static SVG files...
   DONE  sample-logo.svg (18% smaller)

 SUCCESS  Optimized 1 SVG files
 INFO  Average size reduction: 18.0%
```

## Why SVGO Matters

### Performance Benefits

- Faster page loads with smaller SVG files
- Reduced bandwidth usage
- Better Lighthouse performance scores
- Optimized for mobile devices

### Quality Maintenance

- Preserves visual quality
- Maintains accessibility features
- Keeps responsive behavior
- Supports theme switching

## Manual Usage

Optimize SVGs independently:

```bash
npm run svg:optimize
```

This processes all SVG files in `static/` without running the full build.

## Best Practices

### Source SVGs

- Use descriptive titles and descriptions
- Include proper viewBox attributes
- Avoid inline styles when possible
- Use semantic markup

### File Organization

- Place reusable SVGs in `static/`
- Use `src/assets/` for logo/favicon sources
- Name files descriptively
- Keep source files unoptimized for future edits

### Theme Support

For favicon SVGs, include theme support:

```css
<style>
  @media (prefers-color-scheme: dark) {
    .theme-adaptive { fill: #ffffff; }
  }
  @media (prefers-color-scheme: light) {
    .theme-adaptive { fill: #3c2252; }
  }
</style>
```

## Troubleshooting

### Optimization Fails

- Check SVG syntax validity
- Ensure proper file permissions
- Verify SVGO installation: `npm list svgo`

### Theme Support Lost

- Favicon optimizer preserves theme CSS
- Check for proper CSS syntax in source SVG
- Verify media query format

### File Size Unchanged

- Some SVGs are already well-optimized
- Complex graphics may have minimal savings
- Check console for specific optimization results

This integration ensures all SVG assets are optimized without manual
intervention, maintaining the build system's automation while improving
performance.
