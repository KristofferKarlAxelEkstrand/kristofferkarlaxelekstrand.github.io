# PNG Optimization

## What is PNG Optimization?

PNG optimization is the process of reducing PNG file sizes while maintaining
visual quality through advanced compression techniques, color palette
optimization, and format-specific optimizations.

## Why PNG Optimization?

- **Performance**: Smaller files load faster, improving page speed
- **Bandwidth**: Reduced data usage for users and hosting costs
- **SEO**: Better Lighthouse scores and search engine rankings
- **User Experience**: Faster image loading improves perceived performance

## How it's used in this project

### Automated Optimization

PNG files in `src/assets/` are automatically optimized during the build process
using Sharp image processing library.

### Build Integration

```bash
npm run png:optimize  # Standalone PNG optimization
npm run build         # Includes PNG optimization in full build
```

### Optimization Process

The optimizer analyzes each PNG file and selects the optimal compression
strategy based on:

- File size (large >100KB, medium >20KB, small <20KB)
- Image dimensions (high-resolution vs standard)
- Color channels (transparency support)
- Content analysis (palette suitability)

## Optimization Strategies

### Aggressive Strategy (Large Files >100KB)

**Used for:** Large images, high-resolution graphics

**Settings:**

- Quality: 85%
- Compression Level: 9 (maximum)
- Palette: Enabled (when no transparency)
- Colors: 128 (with transparency) / 256 (without)
- Effort: 10 (maximum optimization)

**Benefits:**

- Maximum file size reduction
- Maintains acceptable visual quality
- Ideal for hero images and backgrounds

### Balanced Strategy (Medium Files >20KB)

**Used for:** Standard images, content graphics

**Settings:**

- Quality: 90%
- Compression Level: 9 (maximum)
- Palette: Enabled (when no transparency)
- Colors: 256
- Effort: 8 (high optimization)

**Benefits:**

- Good balance of size and quality
- Suitable for most content images
- Preserves important visual details

### Conservative Strategy (Small Files <20KB)

**Used for:** Icons, small graphics, favicons

**Settings:**

- Quality: 95%
- Compression Level: 9 (maximum)
- Palette: Only for very small images
- Colors: 256
- Effort: 6 (moderate optimization)

**Benefits:**

- Preserves maximum visual fidelity
- Prevents over-optimization of small files
- Ideal for UI elements and icons

## Technical Implementation

### Sharp Library Integration

The PNG optimizer uses Sharp for high-performance image processing:

```javascript
await sharp(inputFile)
  .png({
    quality: settings.quality,
    compressionLevel: 9,
    progressive: useProgressive,
    palette: settings.palette,
    colours: settings.colours,
    effort: settings.effort,
  })
  .toFile(outputFile);
```

### Progressive Encoding

Configurable progressive PNG encoding:

```bash
# Enable progressive PNGs (may increase file size)
PNG_PROGRESSIVE=true npm run build
```

**Progressive Benefits:**

- Improved perceived loading speed
- Better user experience on slow connections
- Graceful image rendering

**Progressive Drawbacks:**

- Slightly larger file sizes
- Not beneficial for small images
- Limited browser support improvements

### Palette Compression

Smart palette compression based on image characteristics:

- **Enabled:** For images without transparency
- **Colors:** Optimized based on content analysis
- **Strategy:** Prevents palette compression when counterproductive

### File Processing Flow

1. **Analysis**: Examine file size, dimensions, and color channels
2. **Strategy Selection**: Choose optimization approach based on analysis
3. **Processing**: Apply Sharp optimization with selected settings
4. **Validation**: Compare optimized vs original file sizes
5. **Decision**: Keep optimized version only if beneficial
6. **Reporting**: Log compression results and savings

## Performance Metrics

### Compression Results

Typical compression achievements:

- **Large Images**: 30-50% size reduction
- **Medium Images**: 15-30% size reduction
- **Small Images**: 5-15% size reduction (when beneficial)

### Build Performance

Optimization impact on build times:

- **Fast Build**: Skipped (development mode)
- **Full Build**: ~120-150ms processing time
- **Standalone**: ~100-200ms depending on file count

### Size Reporting

The optimizer provides detailed metrics:

```text
PNG Optimizer Starting...

Found 3 PNG file(s) to optimize:

PROC logo.png (85.4KB)
  Strategy: aggressive (512×512, 4 channels)
DONE logo.png → 42.1KB (-50.7%)

PROC icon.png (12.3KB)
  Strategy: conservative (64×64, 4 channels)
SKIP icon.png (already optimal)

Optimization Results:
  Files processed: 1
  Original size: 0.08MB
  Optimized size: 0.04MB
  SAVED 0.04MB (50.7%)
```

## Configuration Options

### Environment Variables

**PNG_PROGRESSIVE**: Enable progressive encoding

```bash
PNG_PROGRESSIVE=true npm run build
```

### Build Pipeline Integration

- Full production builds (`npm run build`)
- Skipped in fast development builds
- Available as standalone command

### File Selection

The optimizer processes:

- All `.png` files in `src/assets/`
- Preserves original files if optimization doesn't help
- Maintains folder structure and filenames

## Error Handling

### Graceful Degradation

- Continues build process on optimization errors
- Preserves original files when optimization fails
- Provides detailed error logging for debugging

### File Validation

- Checks PNG format compatibility
- Handles corrupted or invalid image files
- Reports processing errors with clear messages

### Cleanup

- Removes temporary files automatically
- Cleans up on error conditions
- Prevents disk space accumulation

## Best Practices

### Source File Preparation

- Use high-quality source images
- Avoid pre-compressed or low-quality inputs
- Maintain original files for future optimization

### Optimization Strategy

- Let the optimizer choose the best strategy automatically
- Test progressive encoding for large images
- Monitor compression results for quality assessment

### Production Build Integration

- Include PNG optimization in production builds
- Skip optimization during development for speed
- Use standalone optimization for testing

## Troubleshooting

### Common Issues

**No Optimization Applied:**

- File may already be optimally compressed
- Very small files may not benefit from optimization
- Check console output for skip messages

**Quality Degradation:**

- Verify source image quality
- Consider adjusting strategy settings
- Check for transparency preservation needs

**Build Performance:**

- PNG optimization adds ~150ms to build time
- Skip in development builds for speed
- Process only changed files when possible

### Debug Commands

```bash
# Standalone optimization with verbose output
npm run png:optimize

# Full build with PNG optimization
npm run build

# Check file sizes before/after
npm run size
```

The PNG optimization system ensures optimal file sizes while maintaining visual
quality, contributing to the portfolio's excellent performance scores and fast
loading times.
