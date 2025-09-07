# Favicon Guide

## What are Favicons?

Favicons are small icons representing websites in browser tabs, bookmarks, and
mobile home screens across different devices and platforms.

## Why Favicons?

- **Brand Recognition**: Instant visual identification
- **Professional Presentation**: Demonstrates attention to detail
- **User Experience**: Easy site identification in tabs and bookmarks
- **Platform Coverage**: Support for all devices and operating systems

## How it's used in this project

### Generation Process

Custom build script `build/build-favicons-sharp.js` uses Sharp image processing to generate professional favicon formats from source assets:

**Processing Pipeline:**

1. **Source Analysis**: Detects SVG or PNG source in `src/assets/`
2. **Sharp Processing**: High-quality resizing and format conversion
3. **PNG Optimization**: Applies optimized compression settings for favicons
4. **SVG Optimization**: Uses SVGO for vector icon optimization
5. **Theme Support**: Generates theme-aware SVG icons
6. **Manifest Integration**: Updates PWA manifest with icon references
7. **HTML Integration**: Automatically inserts meta tags into HTML

### Source Files

- **Primary**: `src/assets/logo.svg` - Vector SVG for optimal scaling
- **Fallback**: `src/assets/logo.png` - High-resolution PNG (minimum 512×512)
- **Quality**: Source should be high-resolution for best results at all sizes

### Generated Files

```text
docs/
├── favicon.ico           # Classic 16x16 browser icon
├── favicon-32x32.png     # Modern browser icon (32×32)
├── apple-touch-icon.png  # iOS home screen (180×180)
├── icon-192.png          # Android home screen (192×192)
├── icon-512.png          # High-res Android (512×512)
├── icon-mask.png         # Safari pinned tab mask (optimized)
├── icon.svg              # Vector icon with theme support
└── site.webmanifest      # PWA manifest with icon references
```

### Build Commands

```bash
npm run build             # Full build includes favicon generation
node build/build-favicons-sharp.js  # Standalone favicon generation
```

### Automatic Integration

Favicons are automatically integrated during the build process:

- HTML meta tags inserted into `docs/index.html`
- PWA manifest generated with icon references
- Service worker cache includes favicon files
- Theme support for dark/light mode detection

### Quality Standards

- **Sharp Library**: High-performance image processing with optimal quality
- **Progressive Enhancement**: Supports modern browsers with fallbacks
- **PWA Compliance**: Includes all required manifest icons
- **Cross-Platform Support**: iOS, Android, Windows, macOS compatibility
- **Performance Optimized**: Conservative compression maintains visual fidelity
- **Theme Aware**: SVG icons support system theme detection

### Performance Characteristics

**File Sizes:**

- `favicon.ico`: ~1-2KB (classic format)
- `favicon-32x32.png`: ~0.4-1KB (optimized PNG)
- `apple-touch-icon.png`: ~2-4KB (180×180 PNG)
- `icon-192.png`: ~3-6KB (Android standard)
- `icon-512.png`: ~6-12KB (high-resolution)
- `icon.svg`: ~0.5-2KB (vector format)

**Build Performance:**

- Generation time: ~7-8 seconds (60% of full build)
- Skipped in fast development builds
- Cached by service worker for offline use

The favicon implementation ensures professional brand presence across all
platforms while maintaining optimal file sizes and image quality.
