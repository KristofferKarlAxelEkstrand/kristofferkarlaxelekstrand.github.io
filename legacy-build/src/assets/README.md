# 🎯 Favicon System

Simple, modern favicon generation with Sharp.

## Quick Start

1. **Add your logo** to `src/assets/`:

   ```bash
   src/assets/logo.png  # PNG/JPG (1024×1024+ recommended)
   src/assets/logo.svg  # SVG (optional, for crisp scaling)
   ```

2. **Generate favicons**:

   ```bash
   npm run favicon:build
   ```

3. **Deploy**:

   ```bash
   npm run build
   ```

That's it! ✨ Professional favicons are automatically generated and deployed.

## What It Creates

- ✅ **9 favicon files** in multiple formats and sizes
- ✅ **PWA manifest** with proper icon configuration
- ✅ **HTML snippet** ready to copy to your `<head>`
- ✅ **Theme support** for light/dark mode switching
- ✅ **Maskable icons** for Android compatibility

## File Structure

```text
src/assets/     # Your logo files go here
├── logo.png
└── logo.svg

static/fav/     # Generated files (auto-created)
├── favicon.ico
├── favicon-32x32.png
├── apple-touch-icon.png
├── icon-192.png
├── icon-512.png
├── icon-mask.png
├── icon.svg
├── site.webmanifest
└── favicon-html.txt

docs/fav/       # Deployed files (after build)
└── [all favicon files]
```

## Testing

```bash
# Full test suite
npm run test

# PWA audit
npm run audit

# Manual testing
npm run build && npm run lighthouse
```

## Features

- 🏆 **Sharp-based**: High-performance Node.js image processing
- 🎨 **Modern 2025**: SVG favicons, theme switching, maskable icons
- 📱 **Cross-platform**: Works on all browsers and devices
- ⚡ **Optimized**: Sub-10KB total payload
- 🔧 **Simple**: One command to generate everything
