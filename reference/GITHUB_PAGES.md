# GitHub Pages

## What is GitHub Pages?

GitHub Pages is GitHub's free static site hosting service that automatically
deploys websites from repository files with global CDN and HTTPS support.

## Why GitHub Pages?

- **Free Hosting**: No cost professional website hosting
- **Automatic Deployment**: Push-to-deploy workflow
- **Performance**: Global CDN with fast content delivery
- **Security**: Automatic HTTPS certificates
- **Integration**: Seamless GitHub workflow integration

## How it's used in this project

### Repository Setup

- **Repository**: `kristofferkarlaxelekstrand.github.io`
- **Type**: User site (username.github.io format)
- **Source**: `/docs` directory deployment

### Deployment Process

```text
1. Push to main branch
2. GitHub Actions builds project
3. Build outputs to docs/ directory
4. GitHub Pages serves updated content
5. Live at https://kristofferkarlaxelekstrand.github.io
```

### File Structure Served

```text
docs/
├── index.html           # Main portfolio page
├── styles/main.css      # Optimized CSS
├── scripts/app.js       # Minified JavaScript
├── *.png, *.ico        # Favicons and icons
├── robots.txt          # SEO configuration
├── sitemap.xml         # Search engine sitemap
└── sw.js               # Service worker
```

### Configuration

- **Source Directory**: `/docs` folder setting in repository
- **Branch**: `main` branch deployment
- **Custom Domain**: Ready for CNAME configuration
- **HTTPS**: Automatic SSL certificate provisioning

### Performance Features

- **Global CDN**: Fast worldwide content delivery
- **Caching**: Optimized static asset caching
- **Compression**: Automatic gzip compression
- **Security**: HTTPS enforcement for professional standards

The setup provides reliable, professional hosting with automatic deployment that
demonstrates modern development and deployment practices to potential clients
and employers.
