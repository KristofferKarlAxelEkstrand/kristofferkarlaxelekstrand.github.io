# Kristoffer Ekstrand - Portfolio Site

**Modern Jekyll-powered GitHub Pages portfolio with automated builds**

🌐 **Live Site:**
[kristofferkarlaxelekstrand.github.io](https://kristofferkarlaxelekstrand.github.io/)

## ✨ **What This Is**

A professional portfolio showcasing 20+ years experience as Digital Project
Manager, Frontend Developer, and Music Technology Specialist in Stockholm. Built
with Jekyll for optimal GitHub Pages performance.

## 🚀 **Quick Start**

```bash
# Clone and setup
git clone https://github.com/KristofferKarlAxelEkstrand/kristofferkarlaxelekstrand.github.io.git
cd kristofferkarlaxelekstrand.github.io
bundle install

# Start development
bundle exec jekyll serve
# → http://localhost:4000
```

## 🎯 **Key Features**

- **Jekyll Collections**: Structured content for workplaces, projects, lab sites
- **GitHub Pages Native**: Zero-config deployment, automatic builds
- **SEO Optimized**: 109 pages with meta tags, sitemaps, structured data
- **Performance First**: Compressed HTML/CSS, 0.85s build times
- **Responsive Design**: Dark theme with accessibility features

## 📝 **How to Customize**

### **1. Update Your Info**

```yaml
# _config.yml
title: 'Your Name'
email: 'your@email.com'
description: 'Your professional description'
```

### **2. Add Your Experience**

```bash
# Create new workplace
_workplaces/your-company.md

# Add projects
_projects/your-project.md
```

### **3. Customize Design**

```scss
// assets/css/main.scss
// Update colors, fonts, layout
```

## 🌐 **Deploy to GitHub Pages**

1. **Fork this repository**
2. **Update content** with your information
3. **Push to main branch**
4. **Enable GitHub Pages** in repository settings
5. **Done!** Your site builds automatically

## 📁 **Repository Structure**

- **Jekyll Collections**: `_workplaces/`, `_projects/`, `_lab_sites/`,
  `_client_sites/`
- **Layouts & Components**: `_layouts/`, `_includes/`
- **Assets**: `assets/css/`, `assets/images/`
- **Legacy Build System**: `legacy-build/` (archived Node.js implementation)
- **Documentation**: `docs-implementation/`, `reference/`

📖 **Full structure guide:** [REPOSITORY-STRUCTURE.md](REPOSITORY-STRUCTURE.md)

## 🛠️ **Development**

```bash
# Jekyll commands
bundle exec jekyll serve    # Development server
bundle exec jekyll build    # Production build

# Content management
# Edit files in _workplaces/, _projects/, etc.
# Jekyll rebuilds automatically
```

## 🎉 **Template Benefits**

**Performance:**

- Static site generation (lightning fast)
- Optimized CSS/HTML compression
- GitHub Pages CDN delivery

**SEO Excellence:**

- Automatic sitemaps and RSS feeds
- Meta tags and Open Graph
- Structured data markup

**Developer Experience:**

- Hot reload development
- Markdown content editing
- Zero-config deployment

## 📚 **Learn More**

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Guide](https://docs.github.com/en/pages)
- [Repository Structure](REPOSITORY-STRUCTURE.md)
- [Implementation Details](docs-implementation/)

---

**Ready to build your professional portfolio? Fork this repository and make it
yours!** 🚀
