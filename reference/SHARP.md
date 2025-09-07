# Sharp

## What is Sharp?

Sharp is a high-performance Node.js image processing library built on libvips.
It provides fast, memory-efficient image resizing, format conversion, and
optimization capabilities.

## Why Sharp?

- **Performance**: 4-10x faster than alternatives like ImageMagick
- **Memory Efficient**: Streaming processing for large images
- **Quality**: Advanced algorithms for superior image quality
- **Format Support**: WebP, AVIF, PNG, JPEG, SVG, and more
- **Build Integration**: Perfect for automated build pipelines

## How it's used in this project

### Image Processing Tasks

Sharp handles two critical image optimization tasks:

1. **PNG Optimization** (`build/build-png-optimizer.js`)
2. **Favicon Generation** (`build/build-favicons-sharp.js`)

### PNG Optimization

Automatically optimizes PNG files in `src/assets/` with intelligent compression
strategies:

```bash
npm run png:optimize  # Standalone PNG optimization
npm run build         # Includes PNG optimization in full build
```

**Optimization Strategies:**

- **Aggressive**: Large files >100KB - Quality 85, palette compression
- **Balanced**: Medium files >20KB - Quality 90, standard compression
- **Conservative**: Small files/icons - Quality 95, minimal compression

**Key Features:**

- Smart strategy selection based on file size and content
- Preserves originals if optimization doesn't improve file size
- Configurable progressive encoding via `PNG_PROGRESSIVE=true`
- Palette compression for images without transparency
- Detailed compression reports and savings metrics

### Favicon Generation

Generates 9 professional favicon formats from a single source:

```bash
# Automatic during full build
npm run build

# Part of favicon system
node build/build-favicons-sharp.js
```

**Generated Formats:**

- `favicon.ico` - Classic 16x16 browser icon
- `favicon-32x32.png` - Modern browser icon
- `apple-touch-icon.png` - iOS home screen (180x180)
- `icon-192.png` - Android home screen (192x192)
- `icon-512.png` - High-res Android (512x512)
- `icon.svg` - Vector icon with theme support

### Build Integration

Sharp operations are seamlessly integrated into the build pipeline:

1. **PNG Optimize** (Step 2 in full build)
2. **Favicon Generation** (Step 6 in full build)
3. **Performance Monitoring** - Size before/after tracking
4. **Error Handling** - Graceful fallbacks and cleanup

### Configuration

**PNG Progressive Encoding:**

```bash
# Enable progressive PNGs (may increase file size)
PNG_PROGRESSIVE=true npm run build
```

**Quality Settings:**

- **PNG Optimization**: Adaptive quality (85-95) based on file size
- **Favicon Generation**: Quality 95 for maximum visual fidelity
- **Compression Level**: Maximum (9) for optimal file sizes

### Performance Benefits

**Speed Improvements:**

- 4-10x faster than traditional image processing tools
- Streaming processing for memory efficiency
- Optimized for build pipeline integration

**Quality Benefits:**

- Advanced compression algorithms
- Preserves image quality while reducing file size
- Smart optimization strategy selection

### Error Handling

Sharp operations include comprehensive error handling:

- **Graceful Degradation**: Continues build on non-critical errors
- **File Validation**: Checks image format compatibility
- **Cleanup**: Removes temporary files on error
- **Detailed Logging**: Clear error messages for debugging

## Technical Details

### Installation

Sharp is included as a devDependency and automatically installed with:

```bash
npm install
```

### API Usage

The project uses Sharp's fluent API for image processing:

```javascript
// PNG optimization example
await sharp(inputFile)
  .png({
    quality: 90,
    compressionLevel: 9,
    progressive: false,
    palette: true,
    colours: 256,
  })
  .toFile(outputFile);

// Favicon resizing example
await sharp(sourceFile)
  .resize(192, 192)
  .png(getFaviconPNGSettings(metadata))
  .toFile('icon-192.png');
```

### Memory Management

Sharp automatically manages memory usage through:

- Streaming processing for large files
- Automatic garbage collection
- Temporary file cleanup
- Efficient buffer management

## Build Output

### File Size Optimization

Sharp consistently achieves:

- **PNG Compression**: 10-50% file size reduction
- **Quality Preservation**: Visual quality maintained at smaller sizes
- **Format Efficiency**: Optimal compression for each image type

### Performance Metrics

Build performance improvements:

- **Processing Speed**: Faster than alternative image tools
- **Memory Usage**: Lower memory footprint during builds
- **Pipeline Integration**: Minimal impact on total build time

## Troubleshooting

### Common Issues

**Installation Problems:**

- Requires Node.js native compilation
- May need Visual Studio Build Tools on Windows
- Platform-specific binaries downloaded automatically

**Memory Issues:**

- Large images may require increased Node.js heap size
- Streaming processing handles most memory constraints
- Temporary files cleaned up automatically

**Format Support:**

- SVG input requires `sharp` with SVG support
- Some formats may require additional dependencies
- Error messages indicate specific format issues

### Debug Commands

```bash
# Check Sharp installation
node -e "console.log(require('sharp'))"

# Test PNG optimization
npm run png:optimize

# Verbose build output
npm run build --verbose
```

Sharp provides the foundation for professional image optimization in this build
system, ensuring optimal performance and quality across all image assets.
