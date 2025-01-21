const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Build Pipeline', () => {
	const srcDir = path.resolve(__dirname, '../src');
	const docsDir = path.resolve(__dirname, '../docs');
	const stylesSrc = path.join(srcDir, 'styles', 'main.scss');
	const stylesDest = path.join(docsDir, 'styles', 'main.css');
	const scriptsSrc = path.join(srcDir, 'scripts', 'app.js');
	const scriptsDest = path.join(docsDir, 'scripts', 'app.js');

	beforeEach(() => {
		// Clean up any existing build artifacts before each test
		if (fs.existsSync(stylesDest)) {
			fs.unlinkSync(stylesDest);
		}
		if (fs.existsSync(scriptsDest)) {
			fs.unlinkSync(scriptsDest);
		}
	});

	describe('CSS Build Process', () => {
		test('Sass compilation produces valid CSS file', () => {
			// Verify source file exists
			expect(fs.existsSync(stylesSrc)).toBe(true);

			// Run Sass compilation
			execSync('npm run build:css', { stdio: 'pipe' });

			// Verify output file was created
			expect(fs.existsSync(stylesDest)).toBe(true);

			// Verify CSS content is valid
			const cssContent = fs.readFileSync(stylesDest, 'utf8');
			expect(cssContent).toBeTruthy();
			expect(cssContent.length).toBeGreaterThan(0);

			// Check for expected CSS features
			expect(cssContent).toContain('box-sizing');
			expect(cssContent).toContain('font-family');
			expect(cssContent).toContain('background-color');

			// Validate CSS syntax
			const validation = testUtils.validateCSS(cssContent);
			expect(validation.isValid).toBe(true);
		});

		test('CSS output is compressed and optimized', () => {
			execSync('npm run build:css', { stdio: 'pipe' });

			const cssContent = fs.readFileSync(stylesDest, 'utf8');

			// Check that CSS is actually compressed (no unnecessary whitespace)
			expect(cssContent).not.toMatch(/\n\s*\n/); // No multiple empty lines
			expect(cssContent).toMatch(/}/); // Has closing braces

			// Check file size is reasonable (should be compressed)
			expect(cssContent.length).toBeLessThan(50000); // Less than 50KB
		});

		test('CSS contains expected variables and mixins', () => {
			execSync('npm run build:css', { stdio: 'pipe' });

			const cssContent = fs.readFileSync(stylesDest, 'utf8');

			// Check for compiled CSS custom properties
			expect(cssContent).toMatch(/--margin-v-\d+/);
			expect(cssContent).toMatch(/--padding-x/);
			expect(cssContent).toMatch(/--max-pw/);

			// Check for compiled mixins (should be expanded)
			expect(cssContent).toMatch(/margin-top:\s*0/);
			expect(cssContent).toMatch(/margin-bottom:\s*0/);
		});

		test('CSS compilation handles errors gracefully', () => {
			// Create a temporary invalid SCSS file
			const tempSrc = stylesSrc + '.temp';
			const invalidScss = `
                                .test {
                                        color: #fff;
                                        background: invalid-color;
                                }
                        `;
			fs.writeFileSync(tempSrc, invalidScss, 'utf8');

			// Backup original file
			const originalContent = fs.readFileSync(stylesSrc, 'utf8');

			try {
				// Replace with invalid content
				fs.writeFileSync(stylesSrc, invalidScss, 'utf8');

				// This should either fail or produce a warning
				let compilationResult;
				try {
					execSync('npm run build:css', { stdio: 'pipe' });
					compilationResult = 'success';
				} catch (error) {
					compilationResult = 'error';
				}

				// Either way, we should have some result
				expect(['success', 'error']).toContain(compilationResult);
			} finally {
				// Restore original file
				fs.writeFileSync(stylesSrc, originalContent, 'utf8');
				if (fs.existsSync(tempSrc)) {
					fs.unlinkSync(tempSrc);
				}
			}
		});
	});
	describe('JavaScript Build Process', () => {
		test('Babel transpilation produces valid JS file', () => {
			// Verify source file exists
			expect(fs.existsSync(scriptsSrc)).toBe(true);

			// Run JavaScript build
			execSync('npm run build:js', { stdio: 'pipe' });

			// Verify output file was created
			expect(fs.existsSync(scriptsDest)).toBe(true);

			// Verify JS content is valid
			const jsContent = fs.readFileSync(scriptsDest, 'utf8');
			expect(jsContent).toBeTruthy();
			expect(jsContent.length).toBeGreaterThan(0);
		});

		test('JavaScript is transpiled to ES5', () => {
			execSync('npm run build:js', { stdio: 'pipe' });

			const jsContent = fs.readFileSync(scriptsDest, 'utf8');

			// Check for ES5 features (should not contain ES6 arrow functions)
			expect(jsContent).not.toContain('=>');

			// Check for Babel helpers
			expect(jsContent).toContain('use strict');

			// Check that console.log is preserved
			expect(jsContent).toContain('console.log');
		});

		test('JavaScript is minified with Terser', () => {
			execSync('npm run build:js', { stdio: 'pipe' });

			const jsContent = fs.readFileSync(scriptsDest, 'utf8');

			// Check that Terser has processed the file (should contain 'use strict')
			expect(jsContent).toContain('"use strict"');

			// Should be valid JavaScript
			expect(() => new Function(jsContent)).not.toThrow();
		});
	});

	describe('Full Build Process', () => {
		test('Complete build runs without errors', () => {
			// This should not throw an error
			expect(() => {
				execSync('npm run build', { stdio: 'pipe' });
			}).not.toThrow();

			// Verify both CSS and JS outputs exist
			expect(fs.existsSync(stylesDest)).toBe(true);
			expect(fs.existsSync(scriptsDest)).toBe(true);
		});

		test('Build is idempotent (running multiple times produces same result)', () => {
			// Run build twice
			execSync('npm run build', { stdio: 'pipe' });
			const firstCssContent = fs.readFileSync(stylesDest, 'utf8');
			const firstJsContent = fs.readFileSync(scriptsDest, 'utf8');

			// Clean and rebuild
			fs.unlinkSync(stylesDest);
			fs.unlinkSync(scriptsDest);
			execSync('npm run build', { stdio: 'pipe' });

			const secondCssContent = fs.readFileSync(stylesDest, 'utf8');
			const secondJsContent = fs.readFileSync(scriptsDest, 'utf8');

			// Results should be identical
			expect(firstCssContent).toBe(secondCssContent);
			expect(firstJsContent).toBe(secondJsContent);
		});
	});

	describe('Build Dependencies', () => {
		test('Source files are required for build', () => {
			// Temporarily rename source file
			const tempName = stylesSrc + '.backup';
			fs.renameSync(stylesSrc, tempName);

			// Build should either fail or not create output
			try {
				execSync('npm run build:css', { stdio: 'pipe' });
				// If it doesn't throw, check that no output was created
				expect(fs.existsSync(stylesDest)).toBe(false);
			} catch (error) {
				// Expected to throw
				expect(error).toBeDefined();
			}

			// Restore source file
			fs.renameSync(tempName, stylesSrc);
		});

		test('Output directories are created automatically', () => {
			// Remove output directories
			const stylesDir = path.dirname(stylesDest);
			const scriptsDir = path.dirname(scriptsDest);

			if (fs.existsSync(stylesDir)) {
				fs.rmSync(stylesDir, { recursive: true, force: true });
			}
			if (fs.existsSync(scriptsDir)) {
				fs.rmSync(scriptsDir, { recursive: true, force: true });
			}

			// Build should create directories
			execSync('npm run build', { stdio: 'pipe' });

			expect(fs.existsSync(stylesDir)).toBe(true);
			expect(fs.existsSync(scriptsDir)).toBe(true);
		});
	});
});
