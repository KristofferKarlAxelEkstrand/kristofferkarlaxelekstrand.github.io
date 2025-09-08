#!/bin/bash

# Jekyll Migration Script for Kristoffer Ekstrand Portfolio
# This script migrates from the current custom build system to Jekyll

echo "🚀 Jekyll Migration Script"
echo "=========================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the repository root"
    exit 1
fi

# Create backup branch
echo "📦 Creating backup branch..."
git checkout -b pre-jekyll-backup 2>/dev/null || echo "Branch already exists"

# Switch back to main
git checkout main

# Copy Jekyll files
echo "📁 Copying Jekyll implementation files..."
cp -r jekyll-implementation/* .

# Copy favicon and assets from docs/
echo "🖼️  Copying existing assets..."
cp docs/favicon.ico .
cp docs/icon.svg .
cp docs/apple-touch-icon.png .
cp docs/icon-192.png .
cp docs/icon-512.png .
cp docs/icon-mask.png .
cp docs/site.webmanifest .
cp docs/robots.txt .
cp docs/sitemap.xml .

# Create _site directory in .gitignore if not exists
if ! grep -q "_site" .gitignore 2>/dev/null; then
    echo "_site/" >> .gitignore
    echo ".jekyll-cache/" >> .gitignore
    echo ".jekyll-metadata" >> .gitignore
fi

echo "✅ Migration files copied successfully!"
echo ""
echo "Next steps:"
echo "1. Install Ruby and Bundler if not installed"
echo "2. Run: bundle install"
echo "3. Run: bundle exec jekyll serve"
echo "4. Visit: http://localhost:4000"
echo "5. Configure GitHub Pages in repository settings"
echo ""
echo "📚 See jekyll-implementation/README.md for detailed instructions"
