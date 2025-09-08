#!/usr/bin/env node

/**
 * Build History Analyzer
 *
 * View and analyze build performance trends from .build-history.json
 */

const fs = require('fs');
const { formatBytes } = require('./build-manager.js');

function loadBuildHistory() {
	try {
		if (!fs.existsSync('.build-history.json')) {
			console.log('No build history found. Run a build first.');
			return [];
		}
		return JSON.parse(fs.readFileSync('.build-history.json', 'utf8'));
	} catch (error) {
		console.error('Error reading build history:', error.message);
		return [];
	}
}

function showRecentBuilds(count = 10) {
	const history = loadBuildHistory();
	if (history.length === 0) return;

	console.log(`\n\x1b[46m\x1b[30m RECENT BUILDS (${Math.min(count, history.length)}) \x1b[0m`);
	console.log('='.repeat(80));

	const recent = history.slice(-count).reverse();

	recent.forEach((build, index) => {
		const date = new Date(build.timestamp).toLocaleString();
		const duration = `${(build.duration / 1000).toFixed(1)}s`.padEnd(6);
		const type = build.buildType.padEnd(6);
		const size = formatBytes(build.finalSize).padEnd(8);
		const saved = build.totalSaved > 0 ? `(-${formatBytes(build.totalSaved)})` : '';
		const warnings = build.warnings.length > 0 ? `⚠${build.warnings.length}` : '';

		console.log(`  ${(index + 1).toString().padStart(2)}. ${date} | ${type} | ${duration} | ${size} ${saved} ${warnings}`);
	});
}

function showPerformanceTrends() {
	const history = loadBuildHistory();
	if (history.length < 2) {
		console.log('Need at least 2 builds to show trends.');
		return;
	}

	console.log(`\n\x1b[46m\x1b[30m PERFORMANCE TRENDS \x1b[0m`);
	console.log('='.repeat(80));

	const fullBuilds = history.filter((b) => b.buildType === 'full');
	const fastBuilds = history.filter((b) => b.buildType === 'fast');

	if (fullBuilds.length > 1) {
		const recent = fullBuilds.slice(-5);
		const avgDuration = recent.reduce((sum, b) => sum + b.duration, 0) / recent.length;
		const avgSize = recent.reduce((sum, b) => sum + b.finalSize, 0) / recent.length;

		console.log(`\nFull Builds (last ${recent.length}):`);
		console.log(`  Average Duration: ${(avgDuration / 1000).toFixed(1)}s`);
		console.log(`  Average Size: ${formatBytes(avgSize)}`);

		// Find slowest steps across recent builds
		const stepStats = {};
		recent.forEach((build) => {
			build.steps.forEach((step) => {
				if (!stepStats[step.name]) {
					stepStats[step.name] = { total: 0, count: 0, max: 0 };
				}
				stepStats[step.name].total += step.duration;
				stepStats[step.name].count += 1;
				stepStats[step.name].max = Math.max(stepStats[step.name].max, step.duration);
			});
		});

		console.log(`\n  Slowest Steps (average):`);
		Object.entries(stepStats)
			.map(([name, stats]) => ({ name, avg: stats.total / stats.count, max: stats.max }))
			.sort((a, b) => b.avg - a.avg)
			.slice(0, 3)
			.forEach((step, i) => {
				console.log(`    ${i + 1}. ${step.name}: ${step.avg.toFixed(0)}ms avg (max: ${step.max}ms)`);
			});
	}

	if (fastBuilds.length > 1) {
		const recent = fastBuilds.slice(-5);
		const avgDuration = recent.reduce((sum, b) => sum + b.duration, 0) / recent.length;

		console.log(`\nFast Builds (last ${recent.length}):`);
		console.log(`  Average Duration: ${(avgDuration / 1000).toFixed(1)}s`);
	}
}

function showSizeAnalysis() {
	const history = loadBuildHistory();
	if (history.length === 0) return;

	console.log(`\n\x1b[46m\x1b[30m SIZE ANALYSIS \x1b[0m`);
	console.log('='.repeat(80));

	const recent = history.slice(-10);
	const totalSaved = recent.reduce((sum, b) => sum + (b.totalSaved || 0), 0);
	const avgCompression = recent.filter((b) => b.totalSaved > 0).length;

	console.log(`\nLast 10 Builds:`);
	console.log(`  Total Size Saved: ${formatBytes(totalSaved)}`);
	console.log(`  Builds with Compression: ${avgCompression}/${recent.length}`);

	if (recent.length > 0) {
		const latest = recent[recent.length - 1];
		console.log(`\nCurrent Build Size: ${formatBytes(latest.finalSize)}`);

		if (recent.length > 1) {
			const previous = recent[recent.length - 2];
			const diff = latest.finalSize - previous.finalSize;
			if (diff > 0) {
				console.log(`  Size Change: +${formatBytes(diff)} (grew)`);
			} else if (diff < 0) {
				console.log(`  Size Change: ${formatBytes(diff)} (shrunk)`);
			} else {
				console.log(`  Size Change: No change`);
			}
		}
	}
}

// CLI
const command = process.argv[2] || 'recent';

switch (command) {
	case 'recent':
		const count = parseInt(process.argv[3]) || 10;
		showRecentBuilds(count);
		break;
	case 'trends':
		showPerformanceTrends();
		break;
	case 'size':
		showSizeAnalysis();
		break;
	case 'all':
		showRecentBuilds(5);
		showPerformanceTrends();
		showSizeAnalysis();
		break;
	default:
		console.log('Usage:');
		console.log('  node build/build-history.js recent [count]  - Show recent builds');
		console.log('  node build/build-history.js trends          - Show performance trends');
		console.log('  node build/build-history.js size            - Show size analysis');
		console.log('  node build/build-history.js all             - Show everything');
		break;
}
