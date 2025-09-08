#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { optimize } = require('svgo');

/**
 * SVG Optimizer with SVGO
 *
 * Optimizes SVG files for:
 * 1. Favicon generation (src/assets/*.svg)
 * 2. Static files (static/*.svg)
 * 3. Any other SVG files in the build pipeline
 */

class SVGOptimizer {
	constructor() {
		this.config = {
			plugins: [
				'preset-default',
				{
					name: 'removeViewBox',
					active: false, // Keep viewBox for responsive scaling
				},
				{
					name: 'removeDimensions',
					active: true, // Remove width/height for responsive scaling
				},
				{
					name: 'removeTitle',
					active: false, // Keep titles for accessibility
				},
				{
					name: 'removeDesc',
					active: false, // Keep descriptions for accessibility
				},
				{
					name: 'cleanupIds',
					params: {
						minify: true,
						prefix: 'svg-',
					},
				},
				{
					name: 'convertColors',
					params: {
						currentColor: true,
					},
				},
			],
		};

		this.faviconConfig = {
			...this.config,
			plugins: [
				...this.config.plugins,
				{
					name: 'addAttributesToSVGElement',
					params: {
						attributes: [
							{
								'aria-label': 'Site logo',
							},
						],
					},
				},
			],
		};
	}

	/**
	 * Optimize a single SVG file
	 */
	optimizeSVG(inputPath, outputPath, config = this.config) {
		try {
			const svgContent = fs.readFileSync(inputPath, 'utf8');
			const result = optimize(svgContent, {
				path: inputPath,
				...config,
			});

			if (result.error) {
				throw new Error(`SVGO optimization failed: ${result.error}`);
			}

			// Ensure output directory exists
			const outputDir = path.dirname(outputPath);
			if (!fs.existsSync(outputDir)) {
				fs.mkdirSync(outputDir, { recursive: true });
			}

			fs.writeFileSync(outputPath, result.data);

			const originalSize = fs.statSync(inputPath).size;
			const optimizedSize = fs.statSync(outputPath).size;
			const savings = (((originalSize - optimizedSize) / originalSize) * 100).toFixed(1);

			return {
				originalSize,
				optimizedSize,
				savings: parseFloat(savings),
				filename: path.basename(outputPath),
			};
		} catch (error) {
			console.error(`\x1b[41m\x1b[37m ERROR \x1b[0m Failed to optimize ${inputPath}:`, error.message);
			return null;
		}
	}

	/**
	 * Optimize SVG for favicon use (preserves theme support)
	 */
	optimizeFaviconSVG(inputPath, outputPath) {
		console.log('\x1b[44m\x1b[37m BUILD \x1b[0m Optimizing favicon SVG...');

		// Read original SVG
		let svgContent = fs.readFileSync(inputPath, 'utf8');

		// Preserve theme support CSS if present
		const hasThemeSupport = svgContent.includes('prefers-color-scheme');
		let themeCSS = '';

		if (hasThemeSupport) {
			const cssMatch = svgContent.match(/<style[^>]*>([\s\S]*?)<\/style>/);
			if (cssMatch) {
				themeCSS = cssMatch[0];
			}
		}

		// Optimize with SVGO
		const result = this.optimizeSVG(inputPath, outputPath, this.faviconConfig);

		if (result && hasThemeSupport) {
			// Re-add theme support if it was removed
			let optimizedContent = fs.readFileSync(outputPath, 'utf8');
			if (!optimizedContent.includes('prefers-color-scheme') && themeCSS) {
				optimizedContent = optimizedContent.replace(/(<svg[^>]*>)/, `$1${themeCSS}`);
				fs.writeFileSync(outputPath, optimizedContent);
			}
		}

		if (result) {
			console.log(`  \x1b[42m\x1b[30m DONE \x1b[0m ${result.filename} (${result.savings}% smaller)`);
		}

		return result;
	}

	/**
	 * Optimize all SVG files in static directory
	 */
	optimizeStaticSVGs() {
		console.log('\x1b[44m\x1b[37m BUILD \x1b[0m Optimizing static SVG files...');

		const staticDir = path.resolve('static');
		const outputDir = path.resolve('docs');

		if (!fs.existsSync(staticDir)) {
			console.log('  \x1b[43m\x1b[30m INFO \x1b[0m No static directory found');
			return [];
		}

		const svgFiles = fs
			.readdirSync(staticDir)
			.filter((file) => file.toLowerCase().endsWith('.svg'))
			.filter((file) => !file.startsWith('.')); // Skip hidden files

		if (svgFiles.length === 0) {
			console.log('  \x1b[43m\x1b[30m INFO \x1b[0m No SVG files found in static/');
			return [];
		}

		const results = [];

		svgFiles.forEach((file) => {
			const inputPath = path.join(staticDir, file);
			const outputPath = path.join(outputDir, file);

			const result = this.optimizeSVG(inputPath, outputPath);
			if (result) {
				results.push(result);
				console.log(`  \x1b[42m\x1b[30m DONE \x1b[0m ${result.filename} (${result.savings}% smaller)`);
			}
		});

		return results;
	}

	/**
	 * Optimize SVGs in source assets directory
	 */
	optimizeSourceSVGs() {
		const sourceDir = path.resolve('src/assets');

		if (!fs.existsSync(sourceDir)) {
			return [];
		}

		const svgFiles = fs
			.readdirSync(sourceDir)
			.filter((file) => file.toLowerCase().endsWith('.svg'))
			.filter((file) => file.toLowerCase().includes('logo') || file.toLowerCase().includes('icon'));

		return svgFiles.map((file) => path.join(sourceDir, file));
	}

	/**
	 * Run complete SVG optimization
	 */
	run() {
		console.log('\x1b[46m\x1b[30m START \x1b[0m SVG Optimizer Starting...\n');

		const results = {
			static: [],
			favicons: [],
			totalSavings: 0,
			totalFiles: 0,
		};

		try {
			// Optimize static SVGs
			results.static = this.optimizeStaticSVGs();

			// Summary
			const allResults = [...results.static];
			results.totalFiles = allResults.length;
			results.totalSavings = allResults.reduce((sum, r) => sum + r.savings, 0) / allResults.length || 0;

			if (results.totalFiles > 0) {
				console.log(`\n\x1b[42m\x1b[30m SUCCESS \x1b[0m Optimized ${results.totalFiles} SVG files`);
				console.log(`\x1b[43m\x1b[30m INFO \x1b[0m Average size reduction: ${results.totalSavings.toFixed(1)}%`);
			} else {
				console.log('\n\x1b[43m\x1b[30m INFO \x1b[0m No SVG files found to optimize');
			}

			return results;
		} catch (error) {
			console.error('\x1b[41m\x1b[37m ERROR \x1b[0m SVG optimization failed:', error.message);
			process.exit(1);
		}
	}
}

// Run if called directly
if (require.main === module) {
	new SVGOptimizer().run();
}

module.exports = SVGOptimizer;
