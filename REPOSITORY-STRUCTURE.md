# 📁 Repository Structure Documentation

## 🎯 **Clean Jekyll Implementation**

This repository is now organized into logical directories for better
maintainability and clarity.

## 📂 **Directory Structure**

### **Core Jekyll Files** (Root Level)

```
/
├── _config.yml          # Jekyll configuration
├── Gemfile             # Ruby dependencies
├── Gemfile.lock        # Dependency lock file
├── index.html          # Main landing page
├── about.md            # About page
├── package.json        # Node.js dependencies (for development tools)
└── README.md           # This file
```

### **Jekyll Collections & Content**

```
/_collections/
├── _workplaces/        # Work experience content
├── _projects/          # Project showcase content
├── _lab_sites/         # Personal lab sites
└── _client_sites/      # Client work portfolio
```

### **Jekyll Infrastructure**

```
/_infrastructure/
├── _layouts/           # Page templates
├── _includes/          # Reusable components
├── _data/              # YAML data files
└── _site/              # Generated static site (Git ignored)
```

### **Assets & Static Files**

```
/assets/
├── css/                # Stylesheets
├── images/             # Images and media
├── apple-touch-icon.png
├── favicon.ico
├── icon-*.png
├── robots.txt
└── site.webmanifest
```

### **Legacy Build System** (Archived)

```
/legacy-build/
├── build/              # Original Node.js build scripts
├── src/                # Original source files
├── docs/               # Original output directory
├── test/               # Jest test suite
├── coverage/           # Test coverage reports
├── lighthouse/         # Performance reports
├── babel.config.js     # Babel configuration
├── jest.config.js      # Jest configuration
├── postcss.config.js   # PostCSS configuration
└── .build-history.json # Build performance logs
```

### **Implementation Documentation**

```
/docs-implementation/
├── analysis/
│   └── JEKYLL-BEST-PRACTICES-ANALYSIS.md
├── reports/
│   ├── IMPLEMENTATION-SUMMARY.md
│   └── JEKYLL-PRODUCTION-REPORT.md
├── jekyll-implementation/  # Migration artifacts
└── migrate.sh              # Migration script
```

### **Reference Documentation**

```
/reference/
├── BUILD.md            # Build system documentation
├── SASS.md             # Sass configuration guide
├── JEKYLL.md           # Jekyll implementation notes
└── [other guides]      # Various technical references
```

## 🚀 **Development Workflow**

### **Jekyll Development**

```bash
# Install dependencies
bundle install

# Start development server
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

### **Content Management**

```bash
# Add new workplace
# Create file in _workplaces/company-name.md

# Add new project
# Create file in _projects/project-name.md

# Edit main content
# Edit index.html or about.md
```

### **Deployment**

```bash
# Deploy to GitHub Pages
git add .
git commit -m "Update content"
git push origin main
# GitHub Pages builds automatically
```

## 📊 **Current Implementation Status**

**✅ Active System:** Jekyll 3.10.0 with GitHub Pages **📦 Archived System:**
Custom Node.js build pipeline  
**🗂️ Content Structure:** 17+ content files in collections **🔍 SEO URLs:** 109
automatically generated pages **⚡ Performance:** 0.85s build time, optimized
output

## 🎯 **Key Benefits of Organization**

**Clean Root Directory:**

- Only essential Jekyll files at root level
- Clear separation of concerns
- Easy navigation and maintenance

**Preserved Legacy System:**

- Complete original build system archived
- All documentation and reports organized
- Historical reference maintained

**Professional Structure:**

- Industry-standard Jekyll organization
- GitHub Pages optimized
- Developer-friendly workflow

## 📋 **Next Steps**

1. **Development:** Use Jekyll workflow for all content updates
2. **Legacy Reference:** Consult `/legacy-build/` for original implementation
   details
3. **Documentation:** Check `/docs-implementation/` for analysis and reports
4. **Deployment:** Push to main branch for automatic GitHub Pages deployment

**Repository is now production-ready with clean, professional organization! 🎉**
