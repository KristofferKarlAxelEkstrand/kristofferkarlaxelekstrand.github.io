# Stylelint

## What is Stylelint?

Stylelint is a CSS linter that catches errors, enforces style conventions, and
promotes best practices in CSS and SCSS code.

## Why Stylelint?

- **Error Detection**: Catches CSS syntax and logic errors
- **Style Consistency**: Enforces formatting conventions
- **Best Practices**: Promotes modern CSS standards
- **Code Quality**: Maintains professional presentation
- **Auto-Fixing**: Automatically corrects many issues

## How it's used in this project

### Configuration

Uses standard SCSS configuration:

- `stylelint-config-standard-scss` - Base SCSS rules
- `stylelint-order` - Property ordering enforcement

### Target Files

- `**/*.scss` - All SCSS files throughout the project

### Commands

```bash
npm run lint   # Lint SCSS + Markdown with auto-fix
npm run check  # Pre-commit validation including Stylelint
```

### Rules Enforced

- **SCSS Syntax**: Valid syntax validation
- **Property Order**: Consistent property sequencing
- **Formatting**: Spacing, indentation, quotes
- **Best Practices**: Modern CSS standards
- **Error Prevention**: Logic and syntax issue detection

### Auto-Fix Capabilities

The `--fix` flag automatically corrects:

- Property ordering standardization
- Consistent spacing and indentation
- Quote style normalization
- Trailing semicolon enforcement
- Whitespace cleanup

### Quality Integration

Works alongside:

- **Prettier**: Code formatting
- **Markdownlint**: Documentation quality
- **Build Pipeline**: Pre-build validation

Ensures comprehensive code quality standards across all file types while
maintaining professional SCSS code presentation essential for portfolio
projects.
