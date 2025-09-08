#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

/**
 * Jekyll Favicon Generator with Sharp
 *
 * Adapted for Jekyll workflow:
 * 1. Source: src/assets/logo.png or logo.svg
 * 2. Output: assets/ directory
 * 3. Usage: npm run favicon:generate
 */

class JekyllFaviconGenerator {
	constructor() {
		this.sourceDir = path.resolve('src/assets');
		this.outputDir = path.resolve('assets');

		this.sizes = [
			{ name: 'favicon-32x32.png', size: 32 },
			{ name: 'apple-touch-icon.png', size: 180 },
			{ name: 'icon-192.png', size: 192 },
			{ name: 'icon-512.png', size: 512 },
		];
	}

	async run() {
		console.log('\x1b[46m\x1b[30m START \x1b[0m Jekyll Favicon Generator Starting...\n');

		try {
			const { image, svg } = this.findSourceFiles();

			if (!image && !svg) {
				this.showSetupInstructions();
				return;
			}

			console.log('\x1b[44m\x1b[37m BUILD \x1b[0m Source files found:');
			if (image) console.log(`  [IMG] ${path.relative(process.cwd(), image)}`);
			if (svg) console.log(`  [SVG] ${path.relative(process.cwd(), svg)}`);
			console.log('');

			// Generate all favicons
			const success = await this.generateFavicons(image);

			// Handle SVG
			this.processSVG(svg);

			// Generate ICO file
			await this.generateICO();

			// Generate maskable icon
			await this.generateMaskableIcon(image);

			// Update web manifest
			this.updateWebManifest();

			// Show completion
			this.showCompletion();
		} catch (error) {
			console.error('\x1b[41m\x1b[37m ERROR \x1b[0m Favicon generation failed:', error.message);
			process.exit(1);
		}
	}

	findSourceFiles() {
		if (!fs.existsSync(this.sourceDir)) {
			return { image: null, svg: null };
		}

		const files = fs.readdirSync(this.sourceDir);
		const images = files.filter((f) => f.match(/\.(png|jpg|jpeg)$/i) && f.toLowerCase().includes('logo'));
		const svgs = files.filter((f) => f.toLowerCase().endsWith('.svg') && f.toLowerCase().includes('logo'));

		return {
			image: images.length > 0 ? path.join(this.sourceDir, images[0]) : null,
			svg: svgs.length > 0 ? path.join(this.sourceDir, svgs[0]) : null,
		};
	}

	async generateFavicons(sourcePath) {
		if (!sourcePath) return false;

		console.log('\x1b[44m\x1b[37m BUILD \x1b[0m Generating PNG favicons...');

		try {
			const image = sharp(sourcePath);
			const metadata = await image.metadata();
			console.log(`  Source: ${metadata.width}x${metadata.height} ${metadata.format}`);

			for (const config of this.sizes) {
				const outputPath = path.join(this.outputDir, config.name);

				await image
					.resize(config.size, config.size, {
						fit: 'contain',
						background: { r: 60, g: 34, b: 82, alpha: 0 }, // Transparent background
					})
					.png({ quality: 95, compressionLevel: 6 })
					.toFile(outputPath);

				const stats = fs.statSync(outputPath);
				const sizeMB = (stats.size / 1024).toFixed(1);
				console.log(`  \x1b[42m\x1b[30m DONE \x1b[0m ${config.name} (${config.size}x${config.size}, ${sizeMB}KB)`);
			}

			return true;
		} catch (error) {
			console.error(`Error generating favicons: ${error.message}`);
			return false;
		}
	}

	processSVG(svgPath) {
		if (!svgPath) return;

		console.log('\x1b[44m\x1b[37m BUILD \x1b[0m Processing SVG icon...');

		const outputPath = path.join(this.outputDir, 'icon.svg');
		fs.copyFileSync(svgPath, outputPath);

		const stats = fs.statSync(outputPath);
		const sizeMB = (stats.size / 1024).toFixed(1);
		console.log(`  \x1b[42m\x1b[30m DONE \x1b[0m icon.svg (${sizeMB}KB)`);
	}

	async generateICO() {
		console.log('\x1b[44m\x1b[37m BUILD \x1b[0m Generating favicon.ico...');

		const sourcePath = path.join(this.outputDir, 'favicon-32x32.png');
		const icoPath = path.join(this.outputDir, 'favicon.ico');

		if (fs.existsSync(sourcePath)) {
			// Copy 32x32 PNG as ICO for simplicity (modern browsers support PNG favicons)
			fs.copyFileSync(sourcePath, icoPath);
			console.log('  \x1b[42m\x1b[30m DONE \x1b[0m favicon.ico (legacy support)');
		}
	}

	async generateMaskableIcon(sourcePath) {
		if (!sourcePath) return;

		console.log('\x1b[44m\x1b[37m BUILD \x1b[0m Generating maskable icon...');

		try {
			const outputPath = path.join(this.outputDir, 'icon-mask.png');

			// Create maskable version with padding for safe area
			await sharp(sourcePath)
				.resize(420, 420, {
					// Smaller than 512 to add safe area
					fit: 'contain',
					background: { r: 60, g: 34, b: 82, alpha: 1 }, // Solid background
				})
				.extend({
					top: 46,
					bottom: 46,
					left: 46,
					right: 46,
					background: { r: 60, g: 34, b: 82, alpha: 1 },
				})
				.png({ quality: 95 })
				.toFile(outputPath);

			const stats = fs.statSync(outputPath);
			const sizeMB = (stats.size / 1024).toFixed(1);
			console.log(`  \x1b[42m\x1b[30m DONE \x1b[0m icon-mask.png (512x512, ${sizeMB}KB)`);
		} catch (error) {
			console.error(`Error generating maskable icon: ${error.message}`);
		}
	}

	updateWebManifest() {
		console.log('\x1b[44m\x1b[37m BUILD \x1b[0m Updating web manifest...');

		const manifestPath = path.join(this.outputDir, 'site.webmanifest');

		if (fs.existsSync(manifestPath)) {
			const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

			// Update icon paths to use /assets/ prefix
			manifest.icons = manifest.icons.map((icon) => ({
				...icon,
				src: icon.src.startsWith('/assets/') ? icon.src : `/assets/${icon.src.replace(/^\//, '')}`,
			}));

			fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
			console.log('  \x1b[42m\x1b[30m DONE \x1b[0m site.webmanifest updated');
		}
	}

	showSetupInstructions() {
		console.log('\x1b[43m\x1b[30m SETUP \x1b[0m No logo files found!\n');
		console.log('Please add one of these files to src/assets/:');
		console.log('  • logo.png (recommended: 512x512 or larger)');
		console.log('  • logo.svg (vector format)');
		console.log('  • logo.jpg/logo.jpeg\n');
		console.log('Then run: npm run favicon:generate\n');
	}

	showCompletion() {
		console.log('\n\x1b[42m\x1b[30m SUCCESS \x1b[0m Favicon generation complete!\n');

		console.log('Generated files in /assets/:');
		const generated = ['favicon.ico', 'favicon-32x32.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-mask.png', 'icon.svg'];

		generated.forEach((file) => {
			const filePath = path.join(this.outputDir, file);
			if (fs.existsSync(filePath)) {
				const stats = fs.statSync(filePath);
				const sizeMB = (stats.size / 1024).toFixed(1);
				console.log(`  ✅ ${file} (${sizeMB}KB)`);
			}
		});

		console.log('\nNext steps:');
		console.log('1. Run: bundle exec jekyll build');
		console.log('2. Test: bundle exec jekyll serve');
		console.log('3. Deploy: git push origin main\n');
	}
}

// Run if called directly
if (require.main === module) {
	const generator = new JekyllFaviconGenerator();
	generator.run().catch(console.error);
}

module.exports = JekyllFaviconGenerator;
