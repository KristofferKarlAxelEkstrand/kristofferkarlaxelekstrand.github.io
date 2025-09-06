#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

/**
 * 🎯 Modern Favicon Generator with Sharp
 *
 * Simple workflow:
 * 1. Add logo.png/logo.svg to src/assets/
 * 2. Run: npm run favicon:build
 * 3. Deploy: npm run build
 *
 * Generates 9 professional favicon files with PWA support
 */

class FaviconGenerator {
	constructor() {
		this.sourceDir = path.resolve('src/assets');
		this.outputDir = path.resolve('static/fav');

		this.sizes = [
			{ name: 'favicon-32x32.png', size: 32 },
			{ name: 'apple-touch-icon.png', size: 180 },
			{ name: 'icon-192.png', size: 192 },
			{ name: 'icon-512.png', size: 512 },
		];
	}

	async run() {
		console.log('🚀 Favicon Generator Starting...\n');

		try {
			const { image, svg } = this.findSourceFiles();

			if (!image && !svg) {
				this.showSetupInstructions();
				return;
			}

			console.log('📁 Source files found:');
			if (image) console.log(`  🖼️  ${path.relative(process.cwd(), image)}`);
			if (svg) console.log(`  🎨 ${path.relative(process.cwd(), svg)}`);
			console.log('');

			// Generate all favicons
			const success = await this.generateFavicons(image);

			// Handle SVG
			this.processSVG(svg);

			// Generate config files
			this.generateManifest();
			this.generateHTMLSnippet();

			// Validate
			const valid = this.validate();

			if (valid && success) {
				this.showSuccess();
			}
		} catch (error) {
			console.error('❌ Error:', error.message);
			process.exit(1);
		}
	}

	findSourceFiles() {
		if (!fs.existsSync(this.sourceDir)) {
			throw new Error(`Source directory not found: ${this.sourceDir}`);
		}

		const files = fs.readdirSync(this.sourceDir);
		const images = files.filter((f) => f.match(/\.(png|jpg|jpeg)$/i) && (f.toLowerCase().includes('logo') || f.toLowerCase().includes('icon') || f.toLowerCase().includes('favicon')));
		const svgs = files.filter((f) => f.toLowerCase().endsWith('.svg') && (f.toLowerCase().includes('logo') || f.toLowerCase().includes('icon') || f.toLowerCase().includes('favicon')));

		return {
			image: images.length > 0 ? path.join(this.sourceDir, images[0]) : null,
			svg: svgs.length > 0 ? path.join(this.sourceDir, svgs[0]) : null,
		};
	}

	async generateFavicons(sourcePath) {
		if (!sourcePath) return true;

		console.log('🎨 Generating PNG favicons...');

		// Ensure output directory exists
		if (!fs.existsSync(this.outputDir)) {
			fs.mkdirSync(this.outputDir, { recursive: true });
		}

		try {
			const image = sharp(sourcePath);
			const metadata = await image.metadata();
			console.log(`  📐 Source: ${metadata.width}×${metadata.height} ${metadata.format.toUpperCase()}`);

			// Generate standard sizes
			for (const { name, size } of this.sizes) {
				await image
					.resize(size, size, {
						fit: 'contain',
						background: { r: 255, g: 255, b: 255, alpha: 0 },
					})
					.png({ quality: 100, compressionLevel: 9 })
					.toFile(path.join(this.outputDir, name));

				console.log(`  ✓ ${name} (${size}×${size})`);
			}

			// Generate special icons
			await this.createMaskableIcon(image);
			await this.createICOFile();

			return true;
		} catch (error) {
			console.error(`❌ Image processing failed: ${error.message}`);
			return false;
		}
	}

	async createMaskableIcon(sourceImage) {
		const outputPath = path.join(this.outputDir, 'icon-mask.png');

		// Create 340×340 icon in 512×512 canvas with safe zone
		const iconSize = 340;
		const canvasSize = 512;
		const padding = (canvasSize - iconSize) / 2;

		const background = sharp({
			create: {
				width: canvasSize,
				height: canvasSize,
				channels: 4,
				background: { r: 255, g: 255, b: 255, alpha: 1 },
			},
		});

		const resizedIcon = await sourceImage
			.resize(iconSize, iconSize, {
				fit: 'contain',
				background: { r: 255, g: 255, b: 255, alpha: 0 },
			})
			.png()
			.toBuffer();

		await background
			.composite([
				{
					input: resizedIcon,
					top: Math.round(padding),
					left: Math.round(padding),
				},
			])
			.png({ quality: 100, compressionLevel: 9 })
			.toFile(outputPath);

		console.log('  ✓ icon-mask.png (512×512 maskable)');
	}

	async createICOFile() {
		const sourcePath = path.join(this.outputDir, 'favicon-32x32.png');
		const icoPath = path.join(this.outputDir, 'favicon.ico');

		if (fs.existsSync(sourcePath)) {
			fs.copyFileSync(sourcePath, icoPath);
			console.log('  ✓ favicon.ico (legacy support)');
		}
	}

	processSVG(svgPath) {
		if (!svgPath || !fs.existsSync(svgPath)) {
			console.log('⚠️  No SVG found, creating placeholder...');
			this.createPlaceholderSVG();
			return;
		}

		console.log('🎨 Processing SVG with theme support...');

		let svgContent = fs.readFileSync(svgPath, 'utf8');

		// Add theme support if not present
		if (!svgContent.includes('prefers-color-scheme')) {
			const themeCSS = `
  <style>
    @media (prefers-color-scheme: dark) {
      .theme-adaptive { fill: #ffffff; stroke: #ffffff; }
    }
    @media (prefers-color-scheme: light) {
      .theme-adaptive { fill: #3c2252; stroke: #3c2252; }
    }
  </style>`;

			svgContent = svgContent.replace(/(<svg[^>]*>)/, `$1${themeCSS}`);
		}

		fs.writeFileSync(path.join(this.outputDir, 'icon.svg'), svgContent);
		console.log('  ✓ icon.svg (with theme switching)');
	}

	createPlaceholderSVG() {
		const placeholderSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <style>
    @media (prefers-color-scheme: dark) {
      .icon { fill: #ffffff; }
      .bg { fill: #1a1a1a; }
    }
    @media (prefers-color-scheme: light) {
      .icon { fill: #3c2252; }
      .bg { fill: #ffffff; }
    }
  </style>
  <circle class="bg" cx="50" cy="50" r="50"/>
  <circle class="icon" cx="50" cy="50" r="30" fill="none" stroke-width="3"/>
  <text x="50" y="58" text-anchor="middle" font-family="Arial" font-size="28" font-weight="bold" class="icon">K</text>
</svg>`;

		fs.writeFileSync(path.join(this.outputDir, 'icon.svg'), placeholderSVG);
		console.log('  ✓ icon.svg (placeholder created)');
	}

	generateManifest() {
		const manifest = {
			name: 'Kristoffer Ekstrand',
			short_name: 'Kristoffer',
			description: 'Digital Project Manager & Frontend Developer portfolio',
			start_url: '/',
			display: 'standalone',
			background_color: '#3c2252',
			theme_color: '#3c2252',
			icons: [
				{
					src: '/fav/icon-192.png',
					type: 'image/png',
					sizes: '192x192',
					purpose: 'any',
				},
				{
					src: '/fav/icon-512.png',
					type: 'image/png',
					sizes: '512x512',
					purpose: 'any',
				},
				{
					src: '/fav/icon-mask.png',
					type: 'image/png',
					sizes: '512x512',
					purpose: 'maskable',
				},
			],
		};

		fs.writeFileSync(path.join(this.outputDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
		console.log('  ✓ site.webmanifest (PWA config)');
	}

	generateHTMLSnippet() {
		const html = `<!-- Modern Favicon Setup -->
<link rel="icon" href="/fav/favicon.ico" sizes="32x32">
<link rel="icon" href="/fav/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/fav/apple-touch-icon.png">
<link rel="manifest" href="/fav/site.webmanifest">
<meta name="theme-color" content="#3c2252">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">`;

		fs.writeFileSync(path.join(this.outputDir, 'favicon-html.txt'), html);
		console.log('  ✓ favicon-html.txt (ready-to-use HTML)');
	}

	validate() {
		console.log('\n🔍 Validating files...');

		const required = ['favicon.ico', 'favicon-32x32.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-mask.png', 'icon.svg', 'site.webmanifest', 'favicon-html.txt'];

		const missing = [];
		const present = [];

		required.forEach((file) => {
			const filePath = path.join(this.outputDir, file);
			if (fs.existsSync(filePath)) {
				const size = (fs.statSync(filePath).size / 1024).toFixed(1);
				present.push(`✓ ${file} (${size} KB)`);
			} else {
				missing.push(`❌ ${file}`);
			}
		});

		console.log('\nGenerated files:');
		present.forEach((file) => console.log(`  ${file}`));

		if (missing.length > 0) {
			console.log('\nMissing files:');
			missing.forEach((file) => console.log(`  ${file}`));
		}

		return missing.length === 0;
	}

	showSetupInstructions() {
		console.log(`
📁 SETUP REQUIRED

Add your logo files to: src/assets/

Supported formats:
• logo.png, logo.jpg, logo.jpeg (high-res recommended)
• logo.svg (vector with theme support)

Examples:
  src/assets/logo.png      ← Best for raster images
  src/assets/logo.svg      ← Best for vector graphics

Then run: npm run favicon:build
`);
	}

	showSuccess() {
		console.log(`
🎉 SUCCESS! Favicon generation complete!

📂 Files created in: static/fav/
📂 Will deploy to: docs/fav/

✅ 9 professional favicon files generated
✅ PWA manifest with proper configuration
✅ Theme-aware SVG with light/dark switching
✅ Maskable icons for Android compatibility
✅ Cross-platform compatibility

� NEXT STEPS:
1. Copy favicon-html.txt content to your HTML <head>
2. Run 'npm run build' to deploy
3. Test with Chrome DevTools → Application → Manifest

Your modern favicon setup is ready! ✨
`);
	}
}

// Run the generator
if (require.main === module) {
	new FaviconGenerator().run();
}

module.exports = FaviconGenerator;
