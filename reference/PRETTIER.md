# Prettier - Code Formatter

## What is Prettier?

Prettier is an opinionated code formatter that enforces consistent code style
across JavaScript, SCSS, Markdown, and other file types. It automatically
formats code according to predefined rules, eliminating debates about code style
and ensuring consistency across the entire project.

## Role in This Project

Prettier serves as the automated code formatter, maintaining consistent style
across all source files including JavaScript, SCSS, and Markdown. It ensures
clean, readable code without manual formatting effort and helps maintain
professional code quality standards.

### Key Implementation Details

- **Package**: `prettier@^3.6.2`
- **Configuration**: `.prettierrc` with custom settings and file-specific
  overrides
- **Build Script**:
  `"pretty": "prettier --write \"src/**/*.{js,scss}\" \"*.md\""`
- **Files Formatted**: JavaScript, SCSS, and Markdown files
- **Settings**: Single quotes, 4-space tabs, ES5 trailing commas, 1000 character
  print width

### Project-Specific Benefits

- **Consistency**: Uniform formatting across all files in the portfolio project
- **Readability**: Clean, professional code appearance for maintainability
- **Maintainability**: Easier to read and understand code during development
- **Standards**: Enforces industry-standard formatting practices
- **Automation**: Eliminates manual formatting work in the development workflow

### Configuration Example

```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 4,
  "semi": true,
  "useTabs": true,
  "printWidth": 1000,
  "proseWrap": "preserve",
  "overrides": [
    {
      "files": "*.md",
      "options": {
        "useTabs": false,
        "tabWidth": 2,
        "printWidth": 80,
        "proseWrap": "always"
      }
    },
    {
      "files": "*.chatmode.md",
      "options": {
        "useTabs": false,
        "tabWidth": 2,
        "printWidth": 1000,
        "proseWrap": "preserve"
      }
    }
  ]
}
```

### File-Specific Formatting

- **JavaScript/SCSS**: Uses tabs, 4-space width, single quotes, wide print width
- **Markdown**: Uses spaces, 2-space width, 80-character line length, prose
  wrapping
- **Chatmode Files**: Special handling for AI conversation files with preserved
  prose

## Usage

### Manual Formatting

```bash
npm run pretty
# Formats all JavaScript, SCSS, and Markdown files
```

### Check Mode (No Changes)

```bash
npx prettier --check "src/**/*.{js,scss}" "*.md"
# Checks formatting without making changes
```

## Integration with Other Tools

### With Git Workflow

```bash
# Format code before committing
npm run pretty
git add .
git commit -m "Format code with Prettier"
```

### With Development Tools

- **VS Code**: Prettier extension for automatic formatting
- **Command Line**: npm script for batch formatting
- **CI/CD**: Can validate formatting in automated builds

## Best Practices

### Regular Formatting

```bash
# Format before major commits
npm run pretty

# Check formatting status
npx prettier --check "src/**/*.{js,scss}" "*.md"
```

### Configuration Consistency

- Keep `.prettierrc` settings stable
- Document any configuration changes
- Ensure team uses same Prettier version

---

Prettier ensures consistent, professional code formatting across the entire
project, eliminating manual formatting work and maintaining high code quality
standards automatically.
