const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Utility Functions and Scripts', () => {
	const projectRoot = path.resolve(__dirname, '..');

	describe('npm Scripts Validation', () => {
		test('essential npm scripts are defined', () => {
			const packageJson = require('../package.json');
			const requiredScripts = ['build', 'test', 'dev', 'validate', 'clean'];

			requiredScripts.forEach((script) => {
				expect(packageJson.scripts[script]).toBeDefined();
				expect(packageJson.scripts[script].length).toBeGreaterThan(0);
			});
		});

		test('dev script includes watch and serve', () => {
			const packageJson = require('../package.json');
			const devScript = packageJson.scripts.dev;
			expect(devScript).toContain('watch');
			expect(devScript).toContain('serve');
		});
	});

	describe('Project Structure', () => {
		test('required directories exist', () => {
			const dirs = ['src', 'docs', 'src/scripts', 'src/styles', 'docs/scripts', 'docs/styles'];
			dirs.forEach((dir) => {
				expect(fs.existsSync(path.join(projectRoot, dir))).toBe(true);
			});
		});
	});

	describe('Configuration Files', () => {
		test('configuration files are valid JSON', () => {
			const configs = [
				{ file: '.prettierrc', props: ['singleQuote', 'semi', 'tabWidth'] },
				{ file: '.stylelintrc.json', props: ['plugins', 'rules'] },
				{ file: '.babelrc', props: ['presets'] },
			];

			configs.forEach(({ file, props }) => {
				const config = JSON.parse(fs.readFileSync(path.resolve(projectRoot, file), 'utf8'));
				props.forEach((prop) => {
					expect(config).toHaveProperty(prop);
				});
			});
		});
	});

	describe('Project Metadata', () => {
		test('package.json has required fields', () => {
			const packageJson = require('../package.json');
			const fields = ['name', 'version', 'description', 'scripts', 'repository', 'author', 'license'];

			fields.forEach((field) => {
				expect(packageJson[field]).toBeTruthy();
			});

			expect(packageJson.name).toBe('kristofferkarlaxelekstrand.github.io');
			expect(packageJson.repository.url).toContain('github.com');
		});
	});
});
