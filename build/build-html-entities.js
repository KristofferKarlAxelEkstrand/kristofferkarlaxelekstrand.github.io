#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { encode } = require('html-entities');

/**
 * HTML Entity Encoder
 *
 * Automatically converts special characters like & to &amp; in HTML files
 * This allows you to write & in your source and it gets properly encoded
 */

class HTMLEntityEncoder {
	constructor() {
		this.inputFile = 'src/index.html';
		this.outputFile = 'docs/index.html';
	}

	/**
	 * Encode HTML entities in text content only (not in HTML tags)
	 * This preserves HTML structure while encoding text content
	 */
	encodeEntitiesInHTML(html) {
		// Protect JSON-LD script content from encoding
		const jsonLdPattern = /(<script[^>]*type=['"]*application\/ld\+json['"]*[^>]*>)([\s\S]*?)(<\/script>)/gi;
		const jsonLdBlocks = [];
		let processedHtml = html;

		// Extract and protect JSON-LD blocks
		processedHtml = processedHtml.replace(jsonLdPattern, (match, openTag, content, closeTag, offset) => {
			const placeholder = `<!--JSONLD_PLACEHOLDER_${jsonLdBlocks.length}-->`;
			jsonLdBlocks.push({ openTag, content, closeTag });
			return placeholder;
		});

		// Split HTML into segments: tags and text
		const segments = processedHtml.split(/(<[^>]*>)/);

		const encodedSegments = segments
			.map((segment, index) => {
				// Even indices are text content, odd indices are HTML tags
				if (index % 2 === 0) {
					// This is text content - encode entities using default mode
					return encode(segment);
				} else {
					// This is an HTML tag - don't encode
					return segment;
				}
			})
			.join('');

		// Restore JSON-LD blocks
		let finalHtml = encodedSegments;
		jsonLdBlocks.forEach((block, index) => {
			const placeholder = `<!--JSONLD_PLACEHOLDER_${index}-->`;
			finalHtml = finalHtml.replace(placeholder, block.openTag + block.content + block.closeTag);
		});

		return finalHtml;
	}

	/**
	 * Process the HTML file
	 */
	run() {
		try {
			console.log('\x1b[44m\x1b[37m BUILD \x1b[0m Encoding HTML entities...');

			// Ensure docs directory exists
			const docsDir = path.dirname(this.outputFile);
			if (!fs.existsSync(docsDir)) {
				fs.mkdirSync(docsDir, { recursive: true });
			}

			// Read source HTML
			const sourceHtml = fs.readFileSync(this.inputFile, 'utf8');

			// Encode entities in text content only
			const encodedHtml = this.encodeEntitiesInHTML(sourceHtml);

			// Write to destination
			fs.writeFileSync(this.outputFile, encodedHtml, 'utf8');

			console.log(`\x1b[42m\x1b[30m SUCCESS \x1b[0m HTML entities encoded: ${this.inputFile} → ${this.outputFile}`);

			// Log what was changed
			const changes = this.findChanges(sourceHtml, encodedHtml);
			if (changes.length > 0) {
				console.log('\x1b[43m\x1b[30m INFO \x1b[0m Encoded entities:');
				changes.forEach((change) => console.log(`   ${change.from} → ${change.to} (${change.count} occurrences)`));
			} else {
				console.log('\x1b[43m\x1b[30m INFO \x1b[0m No entities needed encoding');
			}
		} catch (error) {
			console.error('\x1b[41m\x1b[37m ERROR \x1b[0m HTML entity encoding failed:', error.message);
			process.exit(1);
		}
	}

	/**
	 * Find what entities were changed for logging
	 */
	findChanges(original, encoded) {
		const changes = [];

		// Count & characters in original vs &amp; in encoded
		const originalAmpersands = (original.match(/&(?!amp;|lt;|gt;|quot;|#x27;)/g) || []).length;
		const encodedAmpersands = (encoded.match(/&amp;/g) || []).length;

		if (encodedAmpersands > originalAmpersands) {
			changes.push({ from: '&', to: '&amp;', count: encodedAmpersands - originalAmpersands });
		}

		// Check for other common entities
		const otherEntities = [
			{ from: '<', to: '&lt;' },
			{ from: '>', to: '&gt;' },
			{ from: '"', to: '&quot;' },
			{ from: "'", to: '&#x27;' },
		];

		otherEntities.forEach((entity) => {
			const originalCount = (original.match(new RegExp(`\\${entity.from}`, 'g')) || []).length;
			const encodedCount = (encoded.match(new RegExp(entity.to.replace(/&/g, '\\&'), 'g')) || []).length;

			if (encodedCount > originalCount) {
				changes.push({ ...entity, count: encodedCount - originalCount });
			}
		});

		return changes;
	}
}

// Run the encoder
if (require.main === module) {
	new HTMLEntityEncoder().run();
}

module.exports = HTMLEntityEncoder;
