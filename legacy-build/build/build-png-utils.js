#!/usr/bin/env node

/**
 * PNG Optimization Utilities
 *
 * Shared utilities for PNG compression settings and optimization logic
 */

/**
 * Get palette and color settings based on optimization strategy
 * @param {string} strategy - 'aggressive', 'balanced', or 'conservative'
 * @param {boolean} hasAlpha - Whether the image has an alpha channel
 * @param {number} pixels - Total number of pixels in the image
 * @returns {Object} - { palette: boolean, colours: number }
 */
function getPaletteSettings(strategy, hasAlpha, pixels) {
	// Palette compression doesn't work well with transparency
	const basePaletteEnabled = !hasAlpha;

	switch (strategy) {
		case 'aggressive':
			// Aggressive: Use palette when possible, fewer colors for better compression
			return {
				palette: basePaletteEnabled,
				colours: hasAlpha ? 256 : 128,
			};

		case 'balanced':
			// Balanced: Use palette when possible, standard color count
			return {
				palette: basePaletteEnabled,
				colours: 256,
			};

		case 'conservative':
			// Conservative: Only use palette for very small images, standard colors
			return {
				palette: basePaletteEnabled && pixels < 10000,
				colours: 256,
			};

		default:
			// Fallback to balanced settings
			return {
				palette: basePaletteEnabled,
				colours: 256,
			};
	}
}

/**
 * Get optimized PNG settings for favicon generation
 * @param {Object} metadata - Sharp image metadata
 * @returns {Object} - PNG optimization settings
 */
function getFaviconPNGSettings(metadata) {
	const { width, height, channels } = metadata;
	const pixels = width * height;
	const hasAlpha = channels === 4;

	// For favicons, use conservative strategy to maintain quality
	const { palette, colours } = getPaletteSettings('conservative', hasAlpha, pixels);

	return {
		quality: 95, // Slightly lower quality for better compression
		compressionLevel: 9, // Maximum compression
		progressive: process.env.PNG_PROGRESSIVE === 'true', // Configurable: false by default for max compression
		palette, // Use palette compression when beneficial (not with transparency)
		colours, // Limit colors for better compression
		effort: 10, // Maximum optimization effort
	};
}

module.exports = {
	getPaletteSettings,
	getFaviconPNGSettings,
};
