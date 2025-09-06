#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Service Worker Build Script
 *
 * Updates CACHE_NAME with timestamp/hash for cache busting
 * Ensures service worker updates on each deployment
 */

function updateServiceWorkerCache() {
	const sourcePath = path.resolve('static/sw.js');
	const destPath = path.resolve('docs/sw.js');

	// Read the source service worker
	let swContent = fs.readFileSync(sourcePath, 'utf8');

	// Generate a unique cache name using timestamp + short hash
	const timestamp = Date.now();
	const hash = crypto
		.createHash('md5')
		.update(swContent + timestamp)
		.digest('hex')
		.substring(0, 8);

	const newCacheName = `toffe-${timestamp}-${hash}`;

	// Replace the CACHE_NAME
	swContent = swContent.replace(/const CACHE_NAME = '[^']*';/, `const CACHE_NAME = '${newCacheName}';`);

	// Ensure destination directory exists
	const destDir = path.dirname(destPath);
	if (!fs.existsSync(destDir)) {
		fs.mkdirSync(destDir, { recursive: true });
	}

	// Write the updated service worker
	fs.writeFileSync(destPath, swContent, 'utf8');

	console.log(`✅ Service worker updated:`);
	console.log(`   Cache name: ${newCacheName}`);
	console.log(`   File: ${destPath}`);
	console.log(`   Size: ${(swContent.length / 1024).toFixed(1)} KB`);

	return newCacheName;
}

// Run if called directly
if (require.main === module) {
	try {
		const cacheName = updateServiceWorkerCache();
		console.log(`\n🚀 Service worker ready for deployment!`);
		console.log(`   New cache will invalidate old caches automatically`);
	} catch (error) {
		console.error('❌ Failed to update service worker:', error.message);
		process.exit(1);
	}
}

module.exports = updateServiceWorkerCache;
