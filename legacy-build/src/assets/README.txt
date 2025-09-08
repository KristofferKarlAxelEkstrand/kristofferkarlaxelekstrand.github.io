# Source Assets Directory

Place your logo files here for automatic favicon generation:

## Required Files
- **logo.png** (or any PNG with "logo", "icon", "favicon" in name)
  - High resolution: 1024×1024 recommended
  - Square aspect ratio
  - Will be automatically resized to all required favicon sizes

- **logo.svg** (or any SVG with "logo", "icon", "favicon" in name)  
  - Square viewBox (e.g., viewBox="0 0 100 100")
  - Will be enhanced with light/dark theme support
  - Used for modern browsers

## Usage
```bash
# After adding your logo files:
npm run favicon:build

# This generates all favicons in static/fav/
# Then run the normal build:
npm run build
```

## Generated Files
The favicon builder creates these files in `static/fav/`:
- favicon.ico (32×32, legacy browsers)
- favicon-32x32.png (PNG fallback)
- apple-touch-icon.png (180×180, iOS)
- icon-192.png (192×192, Android)
- icon-512.png (512×512, PWA splash)
- icon-mask.png (512×512, Android maskable)
- icon.svg (modern browsers with themes)
- site.webmanifest (PWA config)
- favicon-html.txt (HTML snippet)

All files are automatically deployed to `docs/fav/` during build.

## Example Files
You can test the system with placeholder files:
- logo.svg (provided - a simple "K" logo with themes)
- Add your own logo.png for complete testing
