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

Custom build script `build-favicons-sharp.js` generates all formats from a
single source using Sharp image processing.

### Source File

- **Input**: `src/assets/logo.svg`
- **Format**: Vector SVG for crisp scaling
- **Quality**: Maintains sharpness at all sizes

### Generated Files

```text
docs/
├── favicon.ico           # Classic 16x16 browser icon
├── favicon-32x32.png     # Modern browser icon
├── apple-touch-icon.png  # iOS home screen (180x180)
├── icon-192.png          # Android home screen (192x192)
├── icon-512.png          # High-res Android (512x512)
├── icon-mask.png         # Safari pinned tab mask
├── icon.svg              # Vector icon for modern browsers
└── favicon-html.txt      # HTML integration snippet
```

### Build Commands

```bash
npm run build:fav    # Generate all favicon formats
npm run build:assets # Includes favicon generation
```

### HTML Integration

Generated `favicon-html.txt` provides ready-to-use HTML meta tags for
integration into the document head.

### Quality Standards

- **Sharp Library**: Optimal image quality and file sizes
- **Platform Coverage**: All modern favicon requirements
- **PWA Ready**: Includes manifest icons for progressive web apps
- **Cross-Platform**: iOS, Android, Windows, macOS support

The favicon implementation ensures professional brand presence across all
platforms while maintaining optimal file sizes and image quality.
