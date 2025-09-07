#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Enhanced Build Manager with Performance Monitoring
 */

// Size budget configuration
const SIZE_BUDGETS = {
	'Total build output': 5 * 1024 * 1024, // 5MB
	CSS: 100 * 1024, // 100KB
	JS: 200 * 1024, // 200KB
	HTML: 50 * 1024, // 50KB
};

// Favicon file paths for monitoring
const FAVICON_FILES = ['docs/apple-touch-icon.png', 'docs/favicon-32x32.png', 'docs/icon-192.png', 'docs/icon-512.png'];

// Build metrics storage
const buildMetrics = {
	startTime: Date.now(),
	steps: [],
	totalSize: { before: 0, after: 0 },
	warnings: [],
	buildType: 'unspecified',
};

/**
 * Get file size in bytes
 */
function getFileSize(filePath) {
	try {
		return fs.statSync(filePath).size;
	} catch (error) {
		return 0;
	}
}

/**
 * Get directory size recursively
 */
function getDirectorySize(dirPath) {
	let totalSize = 0;
	try {
		const items = fs.readdirSync(dirPath);
		for (const item of items) {
			const fullPath = path.join(dirPath, item);
			const stat = fs.statSync(fullPath);
			if (stat.isDirectory()) {
				totalSize += getDirectorySize(fullPath);
			} else {
				totalSize += stat.size;
			}
		}
	} catch (error) {
		// Directory doesn't exist or can't be read
	}
	return totalSize;
}

/**
 * Format bytes to human readable format
 */
function formatBytes(bytes) {
	if (bytes === 0) return '0 B';
	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Calculate compression ratio
 */
function getCompressionRatio(before, after) {
	if (before === 0) return 0;
	return (((before - after) / before) * 100).toFixed(1);
}

/**
 * Enhanced run function with performance monitoring
 */
function run(name, command, silent = false) {
	console.log(`\x1b[44m\x1b[37m BUILD \x1b[0m ${name}...`);
	const start = Date.now();

	// Measure before size for relevant steps
	let beforeSize = 0;
	let afterSize = 0;
	let targetFiles = [];

	// Define which steps to monitor for size changes
	const sizeMonitoredSteps = {
		CSS: ['docs/styles/main.css'],
		JS: ['docs/scripts/app.js'],
		'JS Minify': ['docs/scripts/app.js'],
		HTML: ['docs/index.html'],
		'PNG Optimize': FAVICON_FILES,
		Favicons: FAVICON_FILES,
	};

	if (sizeMonitoredSteps[name]) {
		targetFiles = sizeMonitoredSteps[name];
		beforeSize = targetFiles.reduce((total, file) => total + getFileSize(file), 0);
	}

	try {
		execSync(command, { stdio: silent ? 'pipe' : 'inherit' });

		// Measure after size
		if (targetFiles.length > 0) {
			afterSize = targetFiles.reduce((total, file) => total + getFileSize(file), 0);
		}

		const duration = Date.now() - start;
		const stepData = {
			name,
			duration,
			success: true,
			beforeSize,
			afterSize,
			compression: beforeSize > 0 ? getCompressionRatio(beforeSize, afterSize) : 0,
		};

		buildMetrics.steps.push(stepData);

		// Display results with size info
		let sizeInfo = '';
		if (beforeSize > 0 && afterSize > 0) {
			const saved = beforeSize - afterSize;
			if (saved > 0) {
				sizeInfo = ` | Saved ${formatBytes(saved)} (${getCompressionRatio(beforeSize, afterSize)}%)`;
			} else if (saved < 0) {
				sizeInfo = ` | Increased ${formatBytes(-saved)}`;
			}
		} else if (afterSize > 0) {
			sizeInfo = ` | Output: ${formatBytes(afterSize)}`;
		}

		console.log(`\x1b[42m\x1b[30m DONE \x1b[0m ${name} (${duration}ms)${sizeInfo}`);

		// Check for performance warnings
		if (duration > 5000) {
			buildMetrics.warnings.push(`${name} took ${duration}ms (>5s)`);
		}

		return true;
	} catch (error) {
		const duration = Date.now() - start;
		buildMetrics.steps.push({
			name,
			duration,
			success: false,
			error: error.message,
		});

		console.error(`\x1b[41m\x1b[37m ERROR \x1b[0m ${name} failed: ${error.message}`);
		return false;
	}
}

function runParallel(tasks) {
	const commands = tasks.map((cmd) => `"${cmd}"`).join(' ');
	return run('Parallel build', `concurrently ${commands}`);
}

/**
 * Save build history to .build-history.json
 */
function saveBuildHistory(buildData) {
	const historyFile = '.build-history.json';
	let history = [];

	try {
		if (fs.existsSync(historyFile)) {
			history = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
		}
	} catch (error) {
		// Start with empty history if JSON parsing fails
		history = [];
	}

	// Add current build
	history.push(buildData);

	// Keep only last 50 builds
	if (history.length > 50) {
		history = history.slice(-50);
	}

	try {
		fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));
	} catch (error) {
		console.warn(`Warning: Could not save build history: ${error.message}`);
	}
}

/**
 * Helper function to check if a step has valid size data
 */
function isValidSizeStep(step) {
	return step.beforeSize > 0 && step.afterSize > 0;
}

/**
 * Generate build performance report
 */
function generateBuildReport() {
	const totalDuration = Date.now() - buildMetrics.startTime;
	const successfulSteps = buildMetrics.steps.filter((s) => s.success);

	console.log('\n' + '='.repeat(60));
	console.log('\x1b[46m\x1b[30m BUILD PERFORMANCE REPORT \x1b[0m');
	console.log('='.repeat(60));

	// Build summary
	console.log(`\nBuild Type: ${buildMetrics.buildType}`);
	console.log(`Total Duration: ${totalDuration}ms (${(totalDuration / 1000).toFixed(1)}s)`);
	console.log(`Steps Completed: ${successfulSteps.length}/${buildMetrics.steps.length}`);

	// Step breakdown
	console.log('\n\x1b[36mStep Performance:\x1b[0m');
	buildMetrics.steps.forEach((step) => {
		const status = step.success ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m';
		const duration = `${step.duration}ms`.padEnd(8);
		const percentage = `(${((step.duration / totalDuration) * 100).toFixed(1)}%)`.padEnd(8);

		let sizeInfo = '';
		if (step.beforeSize > 0 && step.afterSize > 0) {
			const saved = step.beforeSize - step.afterSize;
			if (saved > 0) {
				sizeInfo = ` - Saved ${formatBytes(saved)}`;
			} else if (saved < 0) {
				sizeInfo = ` - Grew ${formatBytes(-saved)}`;
			}
		}

		console.log(`  ${status} ${step.name.padEnd(15)} ${duration} ${percentage}${sizeInfo}`);
	});

	// Bottleneck identification
	const slowestSteps = [...buildMetrics.steps]
		.filter((s) => s.success)
		.sort((a, b) => b.duration - a.duration)
		.slice(0, 3);

	if (slowestSteps.length > 0) {
		console.log('\n\x1b[33mSlowest Steps:\x1b[0m');
		slowestSteps.forEach((step, i) => {
			console.log(`  ${i + 1}. ${step.name} (${step.duration}ms)`);
		});
	}

	// Size budget analysis
	const docsSize = getDirectorySize('docs');
	const sizeBudgets = {
		'Total build output': { size: docsSize, budget: SIZE_BUDGETS['Total build output'] },
		CSS: { size: getFileSize('docs/styles/main.css'), budget: SIZE_BUDGETS.CSS },
		JS: { size: getFileSize('docs/scripts/app.js'), budget: SIZE_BUDGETS.JS },
		HTML: { size: getFileSize('docs/index.html'), budget: SIZE_BUDGETS.HTML },
	};

	console.log('\n\x1b[36mSize Budget Analysis:\x1b[0m');
	Object.entries(sizeBudgets).forEach(([name, { size, budget }]) => {
		const percentage = ((size / budget) * 100).toFixed(1);
		const status = size > budget ? '\x1b[31m⚠\x1b[0m' : '\x1b[32m✓\x1b[0m';
		console.log(`  ${status} ${name.padEnd(20)} ${formatBytes(size).padEnd(10)} (${percentage}% of ${formatBytes(budget)} budget)`);

		if (size > budget) {
			buildMetrics.warnings.push(`${name} exceeds budget: ${formatBytes(size)} > ${formatBytes(budget)}`);
		}
	});

	// Warnings
	if (buildMetrics.warnings.length > 0) {
		console.log('\n\x1b[33mWarnings:\x1b[0m');
		buildMetrics.warnings.forEach((warning) => {
			console.log(`  ⚠ ${warning}`);
		});
	}

	// Total compression achieved
	const validSteps = buildMetrics.steps.filter(isValidSizeStep);
	const totalSaved = validSteps.reduce((total, s) => total + (s.beforeSize - s.afterSize), 0);

	if (totalSaved > 0) {
		console.log(`\n\x1b[32mTotal Size Saved: ${formatBytes(totalSaved)}\x1b[0m`);
	}

	console.log('='.repeat(60) + '\n');

	// Save to build history
	const buildData = {
		timestamp: new Date().toISOString(),
		buildType: buildMetrics.buildType,
		duration: totalDuration,
		steps: buildMetrics.steps,
		warnings: buildMetrics.warnings,
		totalSaved,
		finalSize: docsSize,
	};

	saveBuildHistory(buildData);
}

// CLI usage
if (require.main === module) {
	const buildType = process.argv[2] || 'full';
	buildMetrics.buildType = buildType;

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
		if (!run('PNG Optimize', 'node build/build-png-optimizer.js')) process.exit(1);
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

	// Generate comprehensive build report
	generateBuildReport();
}

module.exports = {
	run,
	runParallel,
	buildMetrics,
	generateBuildReport,
	formatBytes,
	getCompressionRatio,
};
