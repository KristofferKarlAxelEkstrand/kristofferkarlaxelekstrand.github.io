# Lighthouse - Web Performance Auditing

## What is Lighthouse?

Lighthouse is an open-source tool from Google that audits web pages for
performance, accessibility, SEO, and best practices. It provides actionable
recommendations to improve user experience and ensures websites meet modern web
standards.

## Role in This Project

Lighthouse audits Kristoffer's portfolio website for quality metrics and
performance optimization. It ensures the site meets professional standards,
provides excellent user experience, and maintains high scores across all
categories for the GitHub Pages deployment.

### Key Implementation Details

- **Package**: `lighthouse@^12.8.2`
- **Production Audit Script**:
  `"lighthouse": "lighthouse https://kristofferkarlaxelekstrand.github.io --output html --output-path ./lighthouse/lighthouse-report.html"`
- **Local Development Script**:
  `"lighthouse:local": "lighthouse http://localhost:3000 --output html --output-path ./lighthouse/lighthouse-report.html --chrome-flags=\"--headless --disable-gpu --no-sandbox --disable-dev-shm-usage\""`
- **Combined Audit Script**: `"audit": "npm run build && npm run lighthouse"`
- **Categories**: Performance, Accessibility, Best Practices, SEO, PWA
- **Output**: HTML reports saved to `./lighthouse/` directory

### Project-Specific Benefits

- **Performance Monitoring**: Tracks loading speed and Core Web Vitals for the
  portfolio
- **Accessibility Validation**: Ensures WCAG compliance for inclusive design
- **SEO Optimization**: Validates meta tags and structured data for search
  visibility
- **Quality Assurance**: Maintains professional standards for client
  presentations
- **Deployment Confidence**: Automated auditing before GitHub Pages releases

### Audit Categories and Weighting

- **Performance (30%)**: Loading speed, Core Web Vitals (FCP, LCP, CLS, FID)
- **Accessibility (30%)**: Screen reader support, keyboard navigation, color
  contrast
- **Best Practices (20%)**: HTTPS, image optimization, security headers
- **SEO (15%)**: Meta tags, mobile-friendliness, structured data
- **PWA (5%)**: Service workers, offline capability, installability

### Integration with Build Pipeline

- **Pre-deployment**: Run `npm run audit` to build and audit before pushing to
  main
- **Local Development**: Use `npm run lighthouse:local` during development
- **CI/CD**: Can be integrated into GitHub Actions for automated quality checks
- **Report Storage**: HTML reports saved for tracking improvements over time

### Typical Audit Workflow

1. **Development**: Make changes to source files
2. **Build**: Run `npm run build` to compile optimized assets
3. **Audit**: Execute `npm run lighthouse` for production audit
4. **Review**: Check HTML report for scores and recommendations
5. **Optimize**: Address any issues found in the audit
6. **Deploy**: Push improvements to GitHub Pages

### Performance Targets

The project aims for Lighthouse scores of 90+ across all categories:

- **Performance**: Optimize for fast loading of the portfolio content
- **Accessibility**: Ensure 4.5:1 contrast ratio and keyboard navigation
- **SEO**: Proper meta tags for search engine visibility
- **Best Practices**: Modern web standards and security

This ensures Kristoffer's portfolio maintains professional quality and excellent
user experience.
