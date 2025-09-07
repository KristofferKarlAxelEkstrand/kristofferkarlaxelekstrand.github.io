# Prettier

## What is Prettier?

Prettier is an opinionated code formatter that automatically formats code
according to consistent style rules with zero configuration.

## Why Prettier?

- **Consistency**: Eliminates style debates and variations
- **Readability**: Improves code presentation and maintainability
- **Professional Quality**: Essential for portfolio code standards
- **Automation**: Removes manual formatting decisions

## How it's used in this project

### Target Files

- `src/**/*.js` - JavaScript source files
- `src/**/*.scss` - Sass/SCSS stylesheets
- `*.md` - Markdown documentation files

### Commands

```bash
npm run pretty  # Format all supported files
npm run check   # Includes Prettier in pre-commit validation
```

### Formatting Rules

Project uses custom `.prettierrc` configuration:

- **Indentation**: 4 spaces (tabs for most files)
- **Quotes**: Single quotes for strings
- **Semicolons**: Always included
- **Trailing Commas**: ES5-compatible locations
- **Line Width**: 1000 characters (no wrapping)
- **Markdown**: Special handling (2 spaces, 80 char width, always wrap)

### Workflow Integration

- **Pre-commit**: Part of `npm run check` validation
- **Quality Assurance**: Combined with Stylelint and Markdownlint
- **Development**: Run manually when needed for cleanup

### Configuration

Uses custom `.prettierrc` configuration instead of defaults. The configuration
includes special overrides for Markdown files to ensure proper documentation
formatting with appropriate line wrapping.

Maintains professional code quality standards essential for a portfolio where
code presentation is as important as functionality.
