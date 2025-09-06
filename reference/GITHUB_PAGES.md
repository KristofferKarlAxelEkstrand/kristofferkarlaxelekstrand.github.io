# GitHub Pages - Static Site Hosting

## What is GitHub Pages?

GitHub Pages is a free static site hosting service that serves HTML, CSS, and
JavaScript files directly from a GitHub repository. It provides HTTPS by default
and supports custom domains.

## Role in This Project

GitHub Pages hosts the portfolio website from the `/docs` folder, serving the
built and optimized static files. It provides reliable, free hosting with
automatic HTTPS and global CDN distribution.

### Key Implementation Details

- **Repository**: `kristofferkarlaxelekstrand.github.io`
- **Source**: `/docs` folder (built files)
- **URL**: `https://kristofferkarlaxelekstrand.github.io`
- **Branch**: `main` branch
- **Build Process**: Automated deployment via git push

### Project-Specific Benefits

- **Free Hosting**: No hosting costs for the portfolio
- **Automatic HTTPS**: SSL certificate included
- **Global CDN**: Fast loading worldwide
- **Git Integration**: Deploy by pushing to main branch
- **Custom Domain**: Supports kristofferkarlaxelekstrand.github.io

### Deployment Workflow

1. **Development**: Edit files in `src/` folder
2. **Build**: Run `npm run build` to compile assets
3. **Test**: Run `npm run lighthouse` for quality assurance
4. **Deploy**: Push changes to main branch
5. **Live**: Site automatically updates within minutes

### Build and Deploy Integration

The project uses automated build scripts that prepare the `/docs` folder for
GitHub Pages:

```json
"build": "npm run build:css && npm run build:js && npm run build:html"
```

This ensures all assets are optimized before deployment:

- **CSS**: Compiled and compressed from SCSS
- **JavaScript**: Transpiled to ES5 and minified
- **HTML**: Minified with embedded assets optimized

### Quality Assurance Before Deploy

```json
"audit": "npm run build && npm run lighthouse"
```

The audit script combines build and Lighthouse testing to ensure:

- All files compile successfully
- Performance meets standards
- Accessibility requirements are satisfied
- SEO best practices are followed

### Repository Configuration

- **Source Branch**: `main`
- **Source Folder**: `/docs`
- **Build Command**: None (pre-built files)
- **Publish Directory**: `/docs`
- **Domain**: `kristofferkarlaxelekstrand.github.io`

### Performance Benefits

- **CDN Distribution**: Global edge network for fast loading
- **HTTPS by Default**: Secure connections without configuration
- **Compression**: Automatic gzip compression for text files
- **Caching**: Optimized caching headers for static assets
