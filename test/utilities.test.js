const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Utility Functions and Scripts', () => {
	const projectRoot = path.resolve(__dirname, '..');

	describe('npm Scripts Validation', () => {
		test('all npm scripts are defined and accessible', () => {
			const packageJson = require('../package.json');

			expect(packageJson.scripts).toBeDefined();
			expect(typeof packageJson.scripts).toBe('object');

			// Check for essential scripts
			const requiredScripts = ['build', 'build:css', 'build:js', 'test', 'dev'];
			requiredScripts.forEach((script) => {
				expect(packageJson.scripts[script]).toBeDefined();
				expect(typeof packageJson.scripts[script]).toBe('string');
				expect(packageJson.scripts[script].length).toBeGreaterThan(0);
			});
		});

		test('dev script includes watch mode', () => {
			const packageJson = require('../package.json');
			const devScript = packageJson.scripts.dev;

			expect(devScript).toContain('watch');
			expect(devScript).toContain('serve');
		});
	});

	describe('File System Utilities', () => {
		const testDir = path.join(projectRoot, 'test', 'temp');
		const testFile = path.join(testDir, 'test.txt');

		beforeEach(() => {
			// Create test directory if it doesn't exist
			if (!fs.existsSync(testDir)) {
				fs.mkdirSync(testDir, { recursive: true });
			}
		});

		afterEach(() => {
			// Clean up test files
			if (fs.existsSync(testFile)) {
				fs.unlinkSync(testFile);
			}
		});

		afterAll(() => {
			// Clean up test directory
			if (fs.existsSync(testDir)) {
				fs.rmSync(testDir, { recursive: true, force: true });
			}
		});

		test('can create and read files', () => {
			const testContent = 'Hello, test world!';

			// Create file
			fs.writeFileSync(testFile, testContent, 'utf8');
			expect(fs.existsSync(testFile)).toBe(true);

			// Read file
			const readContent = fs.readFileSync(testFile, 'utf8');
			expect(readContent).toBe(testContent);
		});

		test('directory structure is correct', () => {
			const srcDir = path.join(projectRoot, 'src');
			const docsDir = path.join(projectRoot, 'docs');

			expect(fs.existsSync(srcDir)).toBe(true);
			expect(fs.existsSync(docsDir)).toBe(true);

			// Check for expected subdirectories
			expect(fs.existsSync(path.join(srcDir, 'scripts'))).toBe(true);
			expect(fs.existsSync(path.join(srcDir, 'styles'))).toBe(true);
			expect(fs.existsSync(path.join(docsDir, 'scripts'))).toBe(true);
			expect(fs.existsSync(path.join(docsDir, 'styles'))).toBe(true);
		});
	});

	describe('Configuration Files', () => {
		test('Prettier configuration is valid', () => {
			const prettierConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.prettierrc'), 'utf8'));

			expect(prettierConfig).toBeDefined();
			expect(typeof prettierConfig).toBe('object');

			// Check for expected Prettier options
			expect(prettierConfig).toHaveProperty('singleQuote');
			expect(prettierConfig).toHaveProperty('semi');
			expect(prettierConfig).toHaveProperty('tabWidth');
		});

		test('Stylelint configuration is valid', () => {
			const stylelintConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.stylelintrc.json'), 'utf8'));

			expect(stylelintConfig).toBeDefined();
			expect(typeof stylelintConfig).toBe('object');

			// Check for expected Stylelint structure
			expect(stylelintConfig).toHaveProperty('plugins');
			expect(stylelintConfig).toHaveProperty('rules');
		});

		test('Babel configuration is valid', () => {
			const babelConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.babelrc'), 'utf8'));

			expect(babelConfig).toBeDefined();
			expect(typeof babelConfig).toBe('object');

			// Check for expected Babel presets
			expect(babelConfig).toHaveProperty('presets');
			expect(Array.isArray(babelConfig.presets)).toBe(true);
			expect(babelConfig.presets).toContain('@babel/preset-env');
		});
	});

	describe('Development Tools', () => {
		test('ESLint can be run (if configured)', () => {
			// This test checks if ESLint is available
			// It might not be configured yet, so we check gracefully
			try {
				execSync('npx eslint --version', { stdio: 'pipe' });
				// If we get here, ESLint is available
				expect(true).toBe(true);
			} catch (error) {
				// ESLint might not be installed or configured
				// This is acceptable for now
				expect(error.message).toContain('command not found');
			}
		});

		test('Prettier formatting works', () => {
			const testFile = path.join(projectRoot, 'test', 'format-test.js');
			const unformattedCode = 'function test( ){console.log("hello")};';
			const expectedFormatted = "function test() {\n\tconsole.log('hello');\n}\n";

			try {
				// Create test file
				fs.writeFileSync(testFile, unformattedCode, 'utf8');

				// Run Prettier
				execSync(`npx prettier --write ${testFile}`, { stdio: 'pipe' });

				// Check result
				const formattedContent = fs.readFileSync(testFile, 'utf8');
				expect(formattedContent).toBe(expectedFormatted);
			} finally {
				// Clean up
				if (fs.existsSync(testFile)) {
					fs.unlinkSync(testFile);
				}
			}
		});
	});

	describe('Project Metadata', () => {
		test('package.json contains required fields', () => {
			const packageJson = require('../package.json');

			const requiredFields = ['name', 'version', 'description', 'scripts', 'repository', 'keywords', 'author', 'license'];

			requiredFields.forEach((field) => {
				expect(packageJson).toHaveProperty(field);
				expect(packageJson[field]).toBeTruthy();
			});
		});

		test('project name follows conventions', () => {
			const packageJson = require('../package.json');

			expect(packageJson.name).toBe('kristofferkarlaxelekstrand.github.io');
			expect(packageJson.name).toMatch(/^[a-z0-9\-_.]+$/);
		});

		test('repository URL is valid', () => {
			const packageJson = require('../package.json');

			expect(packageJson.repository).toHaveProperty('type', 'git');
			expect(packageJson.repository).toHaveProperty('url');
			expect(packageJson.repository.url).toContain('github.com');
			expect(packageJson.repository.url).toContain('KristofferKarlAxelEkstrand');
		});
	});
});
