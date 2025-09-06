# Kristoffer Karl Axel Ekstrand

Digital Project Manager, Frontend Developer, UX Designer, and Music Technology
enthusiast.

## Live Site

[kristofferkarlaxelekstrand.github.io](https://kristofferkarlaxelekstrand.github.io)

## What This Is

A **GitHub Pages** portfolio site that automatically deploys from the `main`
branch. Built with modern web technologies and optimized for performance.

## Tech Stack

- **Frontend:** Vanilla HTML5, SCSS, ES6+ JavaScript
- **Build Tools:** Sass, Babel, Terser, HTML Minifier Terser, Sharp (favicons)
- **Development:** Live server with hot reload
- **Testing:** Jest with comprehensive test suite
- **Code Quality:** Prettier, Stylelint
- **Deployment:** GitHub Pages (automatic via GitHub Actions)

## Project Structure

```text
├── src/                 # Source files (edit these)
│   ├── assets/         # Images and logos
│   ├── index.html      # Main HTML
│   ├── scripts/        # JavaScript
│   └── styles/         # SCSS styles
├── static/             # Static files
│   ├── fav/           # Generated favicons
│   ├── robots.txt     # SEO
│   ├── sitemap.xml    # SEO
│   └── site.webmanifest # PWA manifest
├── docs/               # Built site (GitHub Pages)
├── build/              # Build scripts
├── test/               # Test files
├── reference/          # Documentation
└── package.json        # Dependencies & scripts
```

## Quick Start

### Prerequisites

- Node.js (v14+)
- npm

### Setup

```bash
# Clone and install
git clone https://github.com/KristofferKarlAxelEkstrand/kristofferkarlaxelekstrand.github.io.git
cd kristofferkarlaxelekstrand.github.io
npm install

# Start development
npm run dev
```

## Development Workflow

### Edit Files

- **HTML:** `src/index.html`
- **Styles:** `src/styles/main.scss`
- **JavaScript:** `src/scripts/app.js`
- **Assets:** `src/assets/` (images, logos)

### Build & Deploy

```bash
npm run build    # Build for production
npm run dev      # Development server with live reload
npm run test     # Run tests
npm run pretty   # Format code
npm run lint     # Run all linters (CSS + Markdown)
npm run lint:css # Lint SCSS files
npm run lint:md  # Lint markdown files
```

### Automatic Deployment

Push to `main` branch → GitHub Actions builds automatically → Deployed to GitHub
Pages

## Favicon Setup

### Generate Favicons

```bash
# Add your logo to src/assets/ (logo.png, logo.svg, etc.)
npm run favicon:build
```

### What You Need

You can provide either or both:

- **PNG/JPG source:** `src/assets/logo.png` (512×512px minimum) - used to
  generate all PNG favicon sizes
- **SVG source:** `src/assets/logo.svg` - used for scalable favicon with theme
  support

**Recommended:** Provide both PNG and SVG for best results:

- PNG for generating multiple sizes (32×32, 180×180, 192×192, 512×512)
- SVG for scalable favicon that adapts to light/dark themes

### Output

The build generates 9 professional favicon files:

- `favicon.ico` - Traditional favicon for older browsers
- `favicon-32x32.png` - Modern favicon for browser tabs
- `apple-touch-icon.png` - iOS home screen icon (180×180)
- `icon-192.png` & `icon-512.png` - PWA icons
- `icon-mask.png` - Maskable PWA icon for Android
- `icon.svg` - Scalable SVG favicon with theme switching
- `site.webmanifest` - PWA manifest file
- `favicon-html.txt` - Ready-to-use HTML meta tags

### Deploy Favicons

```bash
npm run build
git add .
git commit -m "Add favicons"
git push origin main
```

## Testing

Run comprehensive tests:

```bash
npm test
```

Tests cover:

- HTML structure and accessibility
- Links and security
- SEO and meta tags
- Build pipeline integrity
- Performance optimization

## Performance

- **Lighthouse Score:** 90+ across all metrics
- **Build Optimization:** Minified CSS, JS, HTML
- **Image Optimization:** WebP with fallbacks
- **Caching:** Service worker for offline support

## Content Focus

- **Adventure Kid Waveforms:** 4,000+ audio files project
- **Professional Work:** Frontend development and UX design
- **Music Technology:** Chiptune, waveform generation, audio tools
- **Personal Projects:** Creative experiments and lab sites

## Key Features

- **Responsive Design** (mobile-first)
- **Accessibility** (WCAG 2.1 AA compliant)
- **PWA Ready** (installable, offline support)
- **SEO Optimized** (proper meta tags, structured data)
- **Fast Loading** (optimized assets, lazy loading)
- **Modern Build** (ES6+, SCSS, automated deployment)

## Contributing

This is my personal portfolio, but feel free to:

- Report bugs or suggest improvements
- Use as inspiration for your own projects
- Learn from the build setup and optimization techniques

## License

ISC License - feel free to learn from and adapt this code.

---

Built by Kristoffer Karl Axel Ekstrand
