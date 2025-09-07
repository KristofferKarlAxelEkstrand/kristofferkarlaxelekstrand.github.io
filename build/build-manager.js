#!/usr/bin/env node

const { execSync } = require('child_process');

/**
 * Simple Build Manager
 */

function run(name, command, silent = false) {
	console.log(`\x1b[44m\x1b[37m BUILD \x1b[0m ${name}...`);
	const start = Date.now();

	try {
		execSync(command, { stdio: silent ? 'pipe' : 'inherit' });
		console.log(`\x1b[42m\x1b[30m DONE \x1b[0m ${name} (${Date.now() - start}ms)`);
		return true;
	} catch (error) {
		console.error(`\x1b[41m\x1b[37m ERROR \x1b[0m ${name} failed: ${error.message}`);
		return false;
	}
}

function runParallel(tasks) {
	const commands = tasks.map((cmd) => `"${cmd}"`).join(' ');
	return run('Parallel build', `concurrently ${commands}`);
}

// CLI usage
if (require.main === module) {
	const buildType = process.argv[2] || 'full';
	const start = Date.now();

	console.log(`\x1b[46m\x1b[30m START \x1b[0m Starting ${buildType} build...\n`);

	// Clean
	if (!run('Clean', 'npm run clean', true)) process.exit(1);

	if (buildType === 'fast') {
		// Fast build - development mode
		if (!run('CSS', 'npx sass src/styles:docs/styles --style=expanded --source-map')) process.exit(1);
		if (!run('JS', 'npx babel src/scripts --out-dir docs/scripts --presets=@babel/preset-env --config-file ./babel.config.js --quiet')) {
			process.exit(1);
		} else {
			console.log(`\x1b[42m\x1b[30m SUCCESS \x1b[0m Compiled JavaScript files`);
		}
		if (!run('HTML', 'node build/build-html-entities.js')) process.exit(1);
		if (!run('Service Worker', 'node build/build-service-worker.js')) process.exit(1);
		if (!run('Static files', 'node build/build-static.js')) process.exit(1);
	} else {
		// Full build - production mode
		if (!run('CSS', 'npx sass src/styles:docs/styles --style=expanded --no-source-map && npx postcss docs/styles/main.css --replace --config postcss.config.js')) process.exit(1);
		if (!run('JS', 'npx babel src/scripts --out-dir docs/scripts --presets=@babel/preset-env --config-file ./babel.config.js --quiet')) {
			process.exit(1);
		} else {
			console.log(`\x1b[42m\x1b[30m SUCCESS \x1b[0m Compiled JavaScript files`);
		}
		if (!run('JS Minify', 'npx terser docs/scripts/app.js -o docs/scripts/app.js --compress --mangle')) process.exit(1);
		if (!run('HTML', 'node build/build-html-entities.js && npx html-minifier-terser --input-dir docs --output-dir docs --file-ext html --collapse-whitespace --remove-redundant-attributes --minify-css')) process.exit(1);
		if (!run('Favicons', 'node build/build-favicons-sharp.js')) process.exit(1);
		if (!run('Service Worker', 'node build/build-service-worker.js')) process.exit(1);
		if (!run('Static files', 'node build/build-static.js')) process.exit(1);

		// Skip validation during tests to avoid circular dependency
		if (!process.env.JEST_WORKER_ID && !process.env.CI) {
			if (!run('Validation', 'npm run validate')) process.exit(1);
		}
	}

	console.log(`\n\x1b[45m\x1b[37m END \x1b[0m Build complete in ${Date.now() - start}ms`);
}
