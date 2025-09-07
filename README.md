# Modern GitHub Pages Portfolio

A professional portfolio template with automated builds, optimal performance,
and free GitHub Pages hosting.

## Live Demo

[View the live site →](https://kristofferkarlaxelekstrand.github.io)

## Quick Start

```bash
# Use this template
gh repo create your-username/your-username.github.io --template KristofferKarlAxelEkstrand/kristofferkarlaxelekstrand.github.io --public

# Or fork it
# Click "Fork" on GitHub

# Clone and setup
git clone https://github.com/your-username/your-username.github.io.git
cd your-username.github.io
npm install
npm run dev
```

## Key Features

- **Free hosting** - GitHub Pages deployment included
- **Automatic builds** - Push to deploy with GitHub Actions
- **90+ Lighthouse scores** - Optimized for performance and SEO
- **Mobile-first responsive** - Works perfectly on all devices
- **PWA ready** - Installable with offline support
- **Modern build pipeline** - Sass, Babel, Terser, automated optimization

## How to Customize

Edit these files to make it yours:

1. **`src/index.html`** - Your content, experience, projects
2. **`src/styles/main.scss`** - Colors, fonts, layout
3. **`src/assets/logo.png`** - Your logo (512×512px recommended)
4. **`src/assets/logo.svg`** - SVG version for scalable favicon (optional but
   recommended)

```bash
# Start developing
npm run dev       # Live server + hot reload

# Build for production
npm run build     # Full build with validation
```

## Deploy to GitHub Pages

1. **Enable Pages**: Go to your repo → Settings → Pages
2. **Set source**: Deploy from `/docs` folder on `main` branch
3. **Push changes**: `git push origin main` triggers automatic deployment
4. **Visit your site**: `https://your-username.github.io`

[Complete GitHub Pages setup guide →](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

## Development Commands

```bash
# Development
npm run dev          # Live server + file watching
npm run watch        # CSS + JS watchers only

# Building
npm run build        # Full production build
node build/build-manager.js fast   # Development build (faster)

# Quality & Testing
npm run test         # Run test suite (80% coverage required)
npm run validate     # HTML validation + tests
npm run lint         # Code formatting and style checks
npm run pretty       # Auto-format all code

# Utilities
npm run size         # Check build output file sizes
npm run clean        # Remove build artifacts
npm run lighthouse   # Performance audit
```

## Project Structure

```text
├── src/                 # Source files (edit these)
│   ├── index.html      # Your portfolio content
│   ├── styles/         # SCSS stylesheets
│   ├── scripts/        # JavaScript
│   └── assets/         # Images, logos
├── docs/               # Built site (auto-generated)
├── static/             # Static files (robots.txt, etc)
├── build/              # Build system scripts
└── test/               # Automated tests
```

## What's Included

- **Modern tooling** - Sass, Babel, Terser, PostCSS, Sharp
- **Quality assurance** - Jest tests, HTML validation, Lighthouse audits
- **Developer experience** - Hot reload, code formatting, comprehensive linting
- **Production optimization** - Minified CSS/JS/HTML, optimized images, PWA
  features
- **Professional favicons** - 9 favicon formats generated from PNG/SVG sources
  (supports theme switching)

## Getting Help

- **Issues** -
  [Report bugs or request features](https://github.com/KristofferKarlAxelEkstrand/kristofferkarlaxelekstrand.github.io/issues)
- **Documentation** - Check `/reference` folder for detailed guides
- **Examples** - See the live demo for implementation examples

## License

ISC License - Free to use for personal and commercial projects.

---

Template created by
[Kristoffer Karl Axel Ekstrand](https://kristofferkarlaxelekstrand.github.io)
