# Jekyll Migration for Kristoffer Ekstrand Portfolio

## Overview

This directory contains a complete Jekyll implementation that replaces the current custom build system while maintaining all functionality and improving content management.

## Why Jekyll?

### **Advantages**
- **Native GitHub Pages Support** - No build scripts, GitHub handles everything
- **Structured Content Management** - Collections for organized content types
- **Markdown-Driven** - Easy editing with YAML front matter for metadata
- **SEO & Performance** - Built-in optimizations and plugin ecosystem
- **Simplified Maintenance** - No custom build system to maintain

### **What You Gain**
- Individual pages for each work experience, project, and site
- Easy content updates via Markdown files
- Structured data via YAML front matter
- Automatic sitemap and SEO optimization
- Built-in RSS feed generation
- Simplified deployment process

## Content Architecture

### Collections Structure
```
_workplaces/     # Work experience entries
_projects/       # Personal projects (AKWF, etc.)
_lab_sites/      # Personal experimental sites
_client_sites/   # Client work and sites
```

### Data Files
```
_data/
  content.yml    # Site content strings and intro text
```

### Content Example
Each piece of content is a Markdown file with YAML front matter:

```yaml
---
title: "Grand Public"
role: "Digital Project Manager"
url: "https://www.grandpublic.se/"
start_date: "2025-08-01"
categories: ["Project Management", "Digital Agency"]
---

Content goes here in Markdown format...
```

## File Structure

```
_config.yml                 # Jekyll configuration
Gemfile                     # Ruby dependencies
index.html                  # Homepage template
about.md                    # About page
_layouts/
  default.html              # Base layout
  workplace.html            # Individual workplace pages
  project.html              # Individual project pages
  site.html                 # Individual site pages
_data/
  content.yml               # Site content strings
_workplaces/               # Work experience collection
  grand-public.md
  panagora.md
  vinoteket.md
  # ... etc
_projects/                 # Projects collection
  akwf.md
_lab_sites/               # Lab sites collection
  adventure-kid.md
  karl-axel.md
  # ... etc
_client_sites/            # Client sites collection
  sjostrand-coffee.md
  vinoteket.md
  litium.md
assets/css/
  main.scss               # Sass styles (unchanged)
```

## Migration Process

### 1. Backup Current Site
```bash
git checkout -b jekyll-migration
```

### 2. Install Jekyll Dependencies
```bash
# Install Ruby and Bundler if not present
gem install bundler

# Copy Jekyll implementation files
cp -r jekyll-implementation/* .

# Install gems
bundle install
```

### 3. Test Locally
```bash
# Serve locally
bundle exec jekyll serve

# Visit http://localhost:4000
```

### 4. Configure GitHub Pages
1. Go to repository Settings → Pages
2. Set source to "Deploy from a branch"
3. Select "main" branch and "/ (root)" folder
4. GitHub will automatically detect Jekyll and build

### 5. Update Domain (if needed)
Add `CNAME` file with your domain if using custom domain.

## Content Management

### Adding New Work Experience
```bash
# Create new file in _workplaces/
vim _workplaces/new-company.md
```

```yaml
---
title: "Company Name"
role: "Your Role"
url: "https://company.com"
start_date: "2025-01-01"
end_date: "2026-01-01"  # or null for current
categories: ["Category1", "Category2"]
---

Description of the company and your work...
```

### Adding New Project
```bash
# Create new file in _projects/
vim _projects/new-project.md
```

### Editing Content Strings
Edit `_data/content.yml` to update intro text and section descriptions.

## SEO & Performance Features

- **Jekyll SEO Tag Plugin** - Automatic meta tags, Open Graph, Twitter Cards
- **Automatic Sitemap** - Generated sitemap.xml
- **RSS Feed** - Built-in feed generation
- **Structured Data** - JSON-LD schema markup
- **Asset Optimization** - Sass compilation and CSS minification

## Deployment

### Automatic (Recommended)
1. Push to main branch
2. GitHub automatically builds and deploys
3. No GitHub Actions configuration needed

### Manual Testing
```bash
# Build locally
bundle exec jekyll build

# Output goes to _site/
```

## Comparison with Current System

| Feature | Current | Jekyll |
|---------|---------|--------|
| Build System | Custom Node.js | GitHub Pages (automatic) |
| Content Management | HTML editing | Markdown + YAML |
| Individual Pages | No | Yes (collections) |
| SEO Optimization | Manual | Automatic (plugins) |
| Content Structure | Single HTML file | Organized collections |
| Maintenance | Custom scripts | Jekyll ecosystem |

## Benefits for Content Updates

### Before (Current System)
1. Edit large HTML file
2. Find correct section
3. Manually update content
4. Run build process
5. Commit and push

### After (Jekyll)
1. Edit specific Markdown file
2. Update YAML front matter if needed
3. Commit and push
4. GitHub automatically builds and deploys

## Individual Page Examples

Each collection item gets its own page:
- `/workplaces/grand-public/` - Individual workplace page
- `/projects/akwf/` - Individual project page
- `/lab_sites/adventure-kid/` - Individual site page

This enables:
- Direct linking to specific experiences
- Better SEO for individual projects
- Organized content structure
- Easy content management

## Advanced Features

### Custom Data
Add custom data files in `_data/` for reusable content:

```yaml
# _data/skills.yml
technical:
  - JavaScript
  - React
  - Shopify
management:
  - Project Leadership
  - Team Coordination
```

Use in templates:
```liquid
{% for skill in site.data.skills.technical %}
  <li>{{ skill }}</li>
{% endfor %}
```

### Custom Collections
Add new content types in `_config.yml`:

```yaml
collections:
  testimonials:
    output: true
    permalink: /:collection/:name/
```

## Migration Checklist

- [ ] Copy Jekyll implementation files
- [ ] Install Ruby and Bundle dependencies
- [ ] Test locally with `bundle exec jekyll serve`
- [ ] Verify all content renders correctly
- [ ] Check individual collection pages
- [ ] Test About page functionality
- [ ] Configure GitHub Pages settings
- [ ] Test production deployment
- [ ] Update any external links if needed
- [ ] Remove old build system files

## Rollback Plan

If needed, rollback is simple:
```bash
git checkout main  # Return to current system
```

The Jekyll implementation is completely separate and doesn't modify existing files until you're ready to switch.
