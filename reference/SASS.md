# Sass

## What is Sass?

Sass is a CSS preprocessor that extends CSS with variables, nesting, mixins, and
functions, compiling to browser-compatible CSS.

## Why Sass?

- **Variables**: Consistent theming and spacing
- **Nesting**: Cleaner, more organized CSS structure
- **Mixins**: Reusable code patterns
- **Maintainability**: Easier to manage large stylesheets

## How it's used in this project

### Architecture

Single source file: `src/styles/main.scss` → compiled to `docs/styles/main.css`

### Build Process

```bash
npm run build:css      # Production: Sass → PostCSS → minified
npm run build:css:fast # Development: Sass with source maps
npm run watch:css      # Live compilation during development
```

### CSS Structure

The SCSS file uses:

- **CSS Custom Properties**: Theme variables (--margin-v-\*, --padding-x)
- **Dark Theme**: Background #3c2252, accent #85ff85
- **Mixins**: `@mixin remove-outer-margins`, `@mixin padding`
- **Responsive Design**: Mobile-first approach

### Pipeline Flow

1. **Sass Compilation**: SCSS syntax → expanded CSS
2. **PostCSS Processing**: Autoprefixer + cssnano optimization
3. **Output**: Optimized CSS for production deployment

### Key Features Used

- Custom property definitions in `:root`
- Nested selectors for component structure
- Mixin-based utility patterns
- Responsive breakpoint management

The Sass setup provides a maintainable foundation for the portfolio's dark theme
and responsive layout.
