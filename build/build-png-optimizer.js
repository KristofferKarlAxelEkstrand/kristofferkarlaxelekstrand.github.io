#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

/**
 * PNG Optimizer using Sharp
 * 
 * Optimizes PNG files with smart compression settings
 * Based on file size and content analysis
 */

class PNGOptimizer {
	constructor() {
		this.inputDir = path.resolve('src/assets');
		this.outputDir = path.resolve('src/assets');
		this.tempDir = path.resolve('build/temp');
		
		this.stats = {
			processed: 0,
			totalOriginal: 0,
			totalOptimized: 0,
			savings: 0
		};
	}

	async run() {
		console.log('\x1b[46m\x1b[30m START \x1b[0m PNG Optimizer Starting...\n');

		try {
			// Ensure temp directory exists
			if (!fs.existsSync(this.tempDir)) {
				fs.mkdirSync(this.tempDir, { recursive: true });
			}

			const pngFiles = this.findPNGFiles();
			
			if (pngFiles.length === 0) {
				console.log('\x1b[43m\x1b[30m INFO \x1b[0m No PNG files found to optimize');
				return;
			}

			console.log(`\x1b[44m\x1b[37m BUILD \x1b[0m Found ${pngFiles.length} PNG file(s) to optimize:\n`);

			for (const file of pngFiles) {
				await this.optimizePNG(file);
			}

			this.showResults();
			this.cleanup();

		} catch (error) {
			console.error('\x1b[41m\x1b[37m ERROR \x1b[0m', error.message);
			this.cleanup();
			process.exit(1);
		}
	}

	findPNGFiles() {
		if (!fs.existsSync(this.inputDir)) {
			return [];
		}

		const files = fs.readdirSync(this.inputDir)
			.filter(file => file.toLowerCase().endsWith('.png'))
			.map(file => path.join(this.inputDir, file));

		return files;
	}

	async optimizePNG(filePath) {
		const fileName = path.basename(filePath);
		const tempPath = path.join(this.tempDir, `optimized_${fileName}`);
		
		try {
			// Get original file stats
			const originalStats = fs.statSync(filePath);
			const originalSize = originalStats.size;
			const originalSizeKB = (originalSize / 1024).toFixed(1);

			console.log(`  \x1b[44m\x1b[37m PROC \x1b[0m ${fileName} (${originalSizeKB}KB)`);

			// Analyze image to determine best optimization strategy
			const image = sharp(filePath);
			const metadata = await image.metadata();
			
			// Choose optimization settings based on image characteristics
			const settings = this.getOptimizationSettings(metadata, originalSize);
			
			console.log(`    Strategy: ${settings.strategy} (${metadata.width}×${metadata.height}, ${metadata.channels} channels)`);

			// Apply optimization
			await image
				.png(settings.png)
				.toFile(tempPath);

			// Check if optimization was beneficial
			const optimizedStats = fs.statSync(tempPath);
			const optimizedSize = optimizedStats.size;
			const optimizedSizeKB = (optimizedSize / 1024).toFixed(1);
			const savings = originalSize - optimizedSize;
			const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

			if (optimizedSize < originalSize && savings > 1024) {
				// Optimization was beneficial, replace original
				fs.copyFileSync(tempPath, filePath);
				
				console.log(`  \x1b[42m\x1b[30m DONE \x1b[0m ${fileName} → ${optimizedSizeKB}KB (-${savingsPercent}%)`);
				
				this.stats.processed++;
				this.stats.totalOriginal += originalSize;
				this.stats.totalOptimized += optimizedSize;
				this.stats.savings += savings;
			} else {
				// Keep original
				console.log(`  \x1b[43m\x1b[30m SKIP \x1b[0m ${fileName} (already optimal)`);
			}

			// Clean up temp file
			if (fs.existsSync(tempPath)) {
				fs.unlinkSync(tempPath);
			}

		} catch (error) {
			console.error(`  \x1b[41m\x1b[37m ERROR \x1b[0m ${fileName}: ${error.message}`);
			
			// Clean up temp file on error
			if (fs.existsSync(tempPath)) {
				fs.unlinkSync(tempPath);
			}
		}
	}

	getOptimizationSettings(metadata, fileSize) {
		const { width, height, channels, density } = metadata;
		const pixels = width * height;
		const isLarge = fileSize > 100 * 1024; // 100KB
		const isHighRes = width > 512 || height > 512;
		const hasAlpha = channels === 4;

		// Configurable progressive setting: defaults to false for better compression
		// Progressive PNGs can improve perceived loading for large images but may increase file size
		// Set PNG_PROGRESSIVE=true environment variable to enable progressive encoding
		const useProgressive = process.env.PNG_PROGRESSIVE === 'true';

		// Strategy 1: High compression for large files
		if (isLarge) {
			const { palette, colours } = this.getPaletteSettings('aggressive', hasAlpha, pixels);
			return {
				strategy: 'aggressive',
				png: {
					quality: 85,
					compressionLevel: 9,
					progressive: useProgressive, // Configurable: false by default for max compression
					palette,
					colours,
					effort: 10
				}
			};
		}

		// Strategy 2: Balanced for medium files
		if (fileSize > 20 * 1024) {
			const { palette, colours } = this.getPaletteSettings('balanced', hasAlpha, pixels);
			return {
				strategy: 'balanced',
				png: {
					quality: 90,
					compressionLevel: 9,
					progressive: useProgressive, // Configurable: false by default for max compression
					palette,
					colours,
					effort: 8
				}
			};
		}

		// Strategy 3: Conservative for small files/icons
		const { palette, colours } = this.getPaletteSettings('conservative', hasAlpha, pixels);
		return {
			strategy: 'conservative',
			png: {
				quality: 95,
				compressionLevel: 9,
				progressive: useProgressive, // Configurable: false by default for max compression
				palette,
				colours,
				effort: 6
			}
		};
	}

	/**
	 * Get palette and color settings based on optimization strategy
	 * @param {string} strategy - 'aggressive', 'balanced', or 'conservative'
	 * @param {boolean} hasAlpha - Whether the image has an alpha channel
	 * @param {number} pixels - Total number of pixels in the image
	 * @returns {Object} - { palette: boolean, colours: number }
	 */
	getPaletteSettings(strategy, hasAlpha, pixels) {
		// Palette compression doesn't work well with transparency
		const basePaletteEnabled = !hasAlpha;

		switch (strategy) {
			case 'aggressive':
				// Aggressive: Use palette when possible, fewer colors for better compression
				return {
					palette: basePaletteEnabled,
					colours: hasAlpha ? 256 : 128
				};

			case 'balanced':
				// Balanced: Use palette when possible, standard color count
				return {
					palette: basePaletteEnabled,
					colours: 256
				};

			case 'conservative':
				// Conservative: Only use palette for very small images, standard colors
				return {
					palette: basePaletteEnabled && pixels < 10000,
					colours: 256
				};

			default:
				// Fallback to balanced settings
				return {
					palette: basePaletteEnabled,
					colours: 256
				};
		}
	}

	showResults() {
		console.log('\n\x1b[44m\x1b[37m BUILD \x1b[0m Optimization Results:');
		
		if (this.stats.processed === 0) {
			console.log('  No files were optimized (all already optimal)');
			return;
		}

		const originalMB = (this.stats.totalOriginal / (1024 * 1024)).toFixed(2);
		const optimizedMB = (this.stats.totalOptimized / (1024 * 1024)).toFixed(2);
		const savingsMB = (this.stats.savings / (1024 * 1024)).toFixed(2);
		const savingsPercent = ((this.stats.savings / this.stats.totalOriginal) * 100).toFixed(1);

		console.log(`  Files processed: ${this.stats.processed}`);
		console.log(`  Original size: ${originalMB}MB`);
		console.log(`  Optimized size: ${optimizedMB}MB`);
		console.log(`  \x1b[42m\x1b[30m SAVED \x1b[0m ${savingsMB}MB (${savingsPercent}%)`);
	}

	cleanup() {
		// Remove temp directory
		if (fs.existsSync(this.tempDir)) {
			const files = fs.readdirSync(this.tempDir);
			files.forEach(file => {
				fs.unlinkSync(path.join(this.tempDir, file));
			});
			fs.rmdirSync(this.tempDir);
		}
	}
}

// CLI usage
if (require.main === module) {
	new PNGOptimizer().run();
}

module.exports = PNGOptimizer;
