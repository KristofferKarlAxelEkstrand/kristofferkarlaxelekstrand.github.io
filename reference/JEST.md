# Jest

## What is Jest?

Jest is a JavaScript testing framework that provides test running, assertions,
mocking, and coverage reporting in a single package.

## Why Jest?

- **Build Validation**: Ensures build processes work correctly
- **Quality Assurance**: Maintains code standards before deployment
- **Error Prevention**: Catches issues before production
- **Coverage Tracking**: Enforces minimum test coverage thresholds

## How it's used in this project

### Configuration

`jest.config.js` settings:

- **Environment**: jsdom for DOM testing
- **Test Pattern**: `**/*.test.js` in test directory
- **Coverage Threshold**: 80% for branches and functions
- **Timeout**: 30 seconds for build validation tests

### Test Structure

```text
test/
├── build.test.js      # Build process validation
├── content.test.js    # HTML output validation
├── utilities.test.js  # Helper function testing
└── setup.js          # Test environment setup
```

### Build Integration

```bash
npm run test           # Run full test suite
npm run validate       # HTML validation + Jest tests
npm run build          # Includes automatic testing
```

### What Gets Tested

- **Build Output**: File existence and structure validation
- **HTML Content**: Semantic structure and required elements
- **Build Process**: Error handling and output verification
- **File Optimization**: Size and compression validation

### Coverage Reporting

- **Threshold**: 80% minimum for branches and functions
- **Output**: HTML reports in `coverage/` directory
- **CI Integration**: Automated coverage validation

The testing setup ensures reliable deployments by validating the build system
works correctly before any code reaches production.
