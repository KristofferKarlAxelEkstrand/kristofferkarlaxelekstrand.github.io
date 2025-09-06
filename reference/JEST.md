# Jest - JavaScript Testing Framework

## What is Jest?

Jest is a JavaScript testing framework with built-in mocking, code coverage, and
snapshot testing capabilities. It's designed for simplicity and works
out-of-the-box for most JavaScript projects, providing a complete testing
solution for modern web applications.

## Role in This Project

Jest validates the static site build process and content quality through
comprehensive testing. It ensures HTML structure, accessibility compliance, and
build pipeline functionality for Kristoffer's portfolio website.

### Key Implementation Details

- **Package**: `jest@^30.1.3` with `jest-environment-jsdom@^30.1.2`
- **Configuration**: `jest.config.js` with jsdom environment for DOM testing
- **Test Script**: `"test": "jest"`
- **Coverage**: 80% threshold for branches and functions
- **Test Files**: `test/*.test.js` and `src/scripts/app.test.js`
- **Setup**: `test/setup.js` for test environment configuration

### Project-Specific Benefits

- **Content Validation**: Tests HTML structure, links, and accessibility
  compliance
- **Build Verification**: Ensures SCSS/CSS compilation and JS transpilation work
  correctly
- **Quality Assurance**: Catches regressions and maintains professional
  standards
- **CI/CD Ready**: Automated testing provides confidence for GitHub Pages
  deployment

### Test Categories

- **Content Tests**: HTML structure validation, SEO meta tags, link checking
- **Build Tests**: SCSS compilation output, JS transpilation verification
- **Integration Tests**: End-to-end build pipeline validation
- **Accessibility Tests**: WCAG compliance checks for the portfolio content

### Configuration Example

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  collectCoverageFrom: ['src/**/*.js', '!src/**/*.test.js'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
    },
  },
  coverageReporters: ['text', 'lcov'],
  testTimeout: 30000,
};
```

This configuration enables DOM testing with jsdom, ensuring tests can interact
with HTML elements just like a real browser.
