# Stylelint - CSS/SCSS Linting

## What is Stylelint?

Stylelint is a modern CSS linter that helps catch errors, enforce conventions,
and improve code quality in CSS and SCSS files. It analyzes stylesheets for
syntax errors, stylistic issues, and potential problems, ensuring consistent and
maintainable CSS code.

## Role in This Project

Stylelint ensures consistent SCSS code quality and enforces best practices
during development of Kristoffer's portfolio website. It runs as part of the
build process and development workflow, maintaining professional CSS standards.

### Key Implementation Details

- **Package**: `stylelint@^16.23.1` with `stylelint-order@^7.0.0` plugin
- **Configuration**: `.stylelintrc.json` with custom rules for property ordering
- **Lint Script**: `"lint:css": "stylelint **/*.scss --fix"`
- **Integration**: Runs automatically during development and build processes
- **Auto-fix**: `--fix` flag automatically corrects many formatting issues

### Project-Specific Benefits

- **Code Consistency**: Enforces alphabetical property ordering for better
  readability
- **Error Prevention**: Catches potential CSS issues before production
  deployment
- **Development Speed**: Auto-fix reduces manual formatting work
- **Maintainability**: Consistent code style across all SCSS files
- **Quality Assurance**: Validates SCSS-specific syntax and patterns

### Configuration Example

```json
{
  "plugins": ["stylelint-order"],
  "rules": {
    "order/properties-alphabetical-order": true
  }
}
```

This configuration ensures all CSS properties are ordered alphabetically, making
stylesheets easier to scan and maintain.

### Integration with Build Pipeline

- **Development**: Runs with `--fix` to automatically correct issues
- **Build Process**: Integrated into quality checks before GitHub Pages
  deployment
- **Pre-commit**: Can be run before committing changes to maintain standards

### Common Issues Caught

- Invalid CSS properties or values
- Inconsistent spacing and formatting
- Missing vendor prefixes (when needed)
- Unused CSS rules
- Accessibility-related CSS issues
