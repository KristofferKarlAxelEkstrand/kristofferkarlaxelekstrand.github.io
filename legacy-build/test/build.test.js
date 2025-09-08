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

	let buildRun = false;

	beforeAll(() => {
		// Run build once for all tests
		if (!buildRun) {
			execSync('npm run build', { stdio: 'pipe' });
			buildRun = true;
		}
	});

	describe('Build Output Validation', () => {
		test('CSS build produces valid output', () => {
			expect(fs.existsSync(stylesDest)).toBe(true);

			const cssContent = fs.readFileSync(stylesDest, 'utf8');
			expect(cssContent.length).toBeGreaterThan(0);
			expect(cssContent).toContain('box-sizing');
			expect(cssContent).toContain('font-family');

			const validation = testUtils.validateCSS(cssContent);
			expect(validation.isValid).toBe(true);
		});

		test('JavaScript build produces valid output', () => {
			expect(fs.existsSync(scriptsDest)).toBe(true);

			const jsContent = fs.readFileSync(scriptsDest, 'utf8');
			expect(jsContent.length).toBeGreaterThan(0);
			expect(jsContent).toContain('"use strict"');
			expect(() => new Function(jsContent)).not.toThrow();
		});

		test('CSS is optimized and compressed', () => {
			const cssContent = fs.readFileSync(stylesDest, 'utf8');
			expect(cssContent.length).toBeLessThan(50000);
			expect(cssContent).toMatch(/--margin-v-\d+/);
		});

		test('JavaScript is transpiled to ES5', () => {
			const jsContent = fs.readFileSync(scriptsDest, 'utf8');
			expect(jsContent).not.toContain('=>');
			expect(jsContent).toContain('use strict');
		});
	});

	describe('Build Dependencies', () => {
		test('Source files exist', () => {
			expect(fs.existsSync(stylesSrc)).toBe(true);
			expect(fs.existsSync(scriptsSrc)).toBe(true);
		});

		test('Output directories exist', () => {
			expect(fs.existsSync(path.dirname(stylesDest))).toBe(true);
			expect(fs.existsSync(path.dirname(scriptsDest))).toBe(true);
		});
	});
});
