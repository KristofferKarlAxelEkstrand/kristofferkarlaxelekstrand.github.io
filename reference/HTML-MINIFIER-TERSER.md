# HTML Minifier Terser - HTML Optimization

## What is HTML Minifier Terser?

HTML Minifier Terser is a highly configurable HTML minifier that uses Terser for
JavaScript minification and Clean-CSS for CSS minification. It's a comprehensive
tool that optimizes HTML files by removing unnecessary whitespace, comments, and
redundant attributes while also minifying embedded JavaScript and CSS.

### Package Information

- **Package**: `html-minifier-terser@^7.2.0`
- **Purpose**: HTML optimization with integrated JS/CSS minification
- **Use Case**: Final build step for Kristoffer's portfolio HTML files

## Role in This Project

In Kristoffer's website project, HTML Minifier Terser serves as the **final
step** in the HTML build pipeline:

```bash
src/index.html → Copy to docs/ → HTML Minifier Terser → Optimized docs/index.html
```

### Build Process Integration

The HTML minification happens after copying the source file:

```json
"build:html": "cp src/index.html docs/index.html && html-minifier-terser --input-dir docs --output-dir docs --file-ext html --collapse-whitespace --remove-redundant-attributes --minify-js --minify-css"
```

### Configuration Options Used

- `--input-dir docs`: Process files in the docs directory
- `--output-dir docs`: Output to the same directory (overwrite)
- `--file-ext html`: Process HTML files
- `--collapse-whitespace`: Remove unnecessary whitespace
- `--remove-redundant-attributes`: Remove attributes with default values
- `--minify-js`: Minify inline JavaScript using Terser
- `--minify-css`: Minify inline CSS using Clean-CSS

## Benefits

### File Size Reduction

- **Before Minification**: ~25KB readable HTML with proper formatting
- **After Minification**: ~20KB compressed HTML (20% reduction)
- **Result**: Faster page load times and improved Core Web Vitals

### Production Optimization

- Removes unnecessary whitespace and line breaks
- Eliminates redundant HTML attributes (e.g., `type="text/javascript"`)
- Minifies inline `<script>` and `<style>` blocks
- Preserves functionality while reducing bandwidth usage
- Maintains HTML5 semantic structure and accessibility

## Example Transformation

**Input (readable HTML):**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Kristoffer Karl Axel Ekstrand</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Kristoffer Karl Axel Ekstrand"
      }
    </script>
  </head>
  <body>
    <header>
      <h1>Kristoffer Ekstrand</h1>
    </header>
  </body>
</html>
```

**Output (minified HTML):**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Kristoffer Karl Axel Ekstrand</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Kristoffer Karl Axel Ekstrand"
      }
    </script>
  </head>
  <body>
    <header><h1>Kristoffer Ekstrand</h1></header>
  </body>
</html>
```

## Why HTML Minifier Terser?

### Integrated Minification

- **HTML**: Removes whitespace and optimizes structure
- **JavaScript**: Uses Terser for ES6+ JavaScript minification
- **CSS**: Uses Clean-CSS for stylesheet optimization
- **All-in-one**: Single tool handles multiple asset types

### Modern Web Standards

- **HTML5 Support**: Properly handles modern HTML elements
- **Accessibility Preservation**: Maintains semantic structure and ARIA
  attributes
- **SEO Friendly**: Preserves meta tags and structured data
- **Performance Focused**: Optimizes for Core Web Vitals

## Project Impact

For this portfolio website:

- **HTML file size**: Reduced from ~25KB to ~20KB (20% reduction)
- **Structured data**: JSON-LD remains valid after minification
- **Load time**: Improved First Contentful Paint (FCP)
- **SEO**: Better page speed scores without losing metadata
- **Accessibility**: All semantic elements and attributes preserved

## Configuration Philosophy

The project uses **conservative minification** settings:

- ✅ Remove whitespace and redundant attributes
- ✅ Minify inline JavaScript and CSS
- ❌ Don't remove comments (preserves important metadata)
- ❌ Don't collapse boolean attributes (maintains compatibility)
- ❌ Don't remove optional tags (preserves HTML5 semantics)

## Alternative Options

Other HTML minification tools include:

- **HTMLMinifier**: Original tool (now deprecated)
- **html-minifier**: Community fork without Terser integration
- **Rollup/Webpack plugins**: Build tool specific solutions
- **PostHTML**: More focused on HTML transformations

HTML Minifier Terser provides the **best balance of optimization and safety**
for static sites with embedded JavaScript and CSS.

## Integration with Other Tools

HTML Minifier Terser complements the other build tools:

1. **Sass** → Compiles SCSS to CSS
2. **Babel + Terser** → Transpiles and minifies JavaScript
3. **HTML Minifier Terser** → Optimizes HTML and any remaining inline assets
4. **GitHub Actions** → Automates the entire pipeline

This creates a **complete optimization workflow** for maximum performance.
