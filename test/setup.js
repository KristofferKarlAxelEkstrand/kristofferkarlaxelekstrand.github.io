// Test setup file for Jest configuration
// This file runs before each test suite

// Mock console methods to reduce noise during testing
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
	// Suppress console output during tests unless explicitly needed
	console.log = jest.fn();
	console.error = jest.fn();
	console.warn = jest.fn();
});

afterAll(() => {
	// Restore original console methods
	console.log = originalConsoleLog;
	console.error = originalConsoleError;
	console.warn = originalConsoleWarn;
});

// Global test utilities
global.testUtils = {
	// Helper to wait for async operations
	waitFor: (condition, timeout = 1000) => {
		return new Promise((resolve, reject) => {
			const startTime = Date.now();
			const checkCondition = () => {
				if (condition()) {
					resolve();
				} else if (Date.now() - startTime > timeout) {
					reject(new Error('Timeout waiting for condition'));
				} else {
					setTimeout(checkCondition, 10);
				}
			};
			checkCondition();
		});
	},

	// Helper to check if file exists
	fileExists: (filePath) => {
		const fs = require('fs');
		try {
			fs.accessSync(filePath, fs.constants.F_OK);
			return true;
		} catch {
			return false;
		}
	},

	// Helper to read file content
	readFile: (filePath) => {
		const fs = require('fs');
		return fs.readFileSync(filePath, 'utf8');
	},

	// Helper to create temporary files for testing
	createTempFile: (content, extension = 'txt') => {
		const fs = require('fs');
		const path = require('path');
		const os = require('os');
		const tempDir = os.tmpdir();
		const fileName = `test-${Date.now()}.${extension}`;
		const filePath = path.join(tempDir, fileName);
		fs.writeFileSync(filePath, content, 'utf8');
		return filePath;
	},

	// Helper to clean up temporary files
	cleanupTempFile: (filePath) => {
		const fs = require('fs');
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath);
		}
	},

	// Helper to parse HTML content for testing
	parseHTML: (htmlContent) => {
		// Simple HTML parsing without jsdom to avoid TextEncoder issues
		return {
			querySelector: (selector) => {
				// Simple selector matching for testing
				if (selector === 'title') {
					const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/);
					return titleMatch ? { textContent: titleMatch[1] } : null;
				}
				if (selector === 'h1') {
					const h1Match = htmlContent.match(/<h1>(.*?)<\/h1>/);
					return h1Match ? { textContent: h1Match[1] } : null;
				}
				if (selector === 'html') {
					const langMatch = htmlContent.match(/<html[^>]*lang="([^"]*)"[^>]*>/);
					return langMatch ? { getAttribute: () => langMatch[1] } : null;
				}
				if (selector === 'main') {
					return htmlContent.includes('<main>') ? { children: [{}, {}] } : null; // Mock children
				}
				if (selector === 'header') {
					return htmlContent.includes('<header>') ? {} : null;
				}
				if (selector === 'footer') {
					return htmlContent.includes('<footer>') ? {} : null;
				}
				if (selector === 'meta[name="description"]') {
					const descMatch = htmlContent.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/);
					return descMatch ? { getAttribute: () => descMatch[1] } : null;
				}
				if (selector === 'meta[name="author"]') {
					const authorMatch = htmlContent.match(/<meta[^>]*name="author"[^>]*content="([^"]*)"[^>]*>/);
					return authorMatch ? { getAttribute: () => authorMatch[1] } : null;
				}
				if (selector.startsWith('#')) {
					const id = selector.substring(1);
					return htmlContent.includes(`id="${id}"`) ? { tagName: 'SECTION' } : null;
				}
				return null;
			},
			querySelectorAll: (selector) => {
				if (selector === 'a') {
					const links = [];
					const linkRegex = /<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g;
					let match;
					while ((match = linkRegex.exec(htmlContent)) !== null) {
						links.push({
							href: match[1],
							textContent: match[2],
						});
					}
					return links;
				}
				if (selector === 'time') {
					const times = [];
					const timeRegex = /<time[^>]*datetime="([^"]*)"[^>]*>(.*?)<\/time>/g;
					timeRegex.lastIndex = 0; // Reset regex state
					let match;
					while ((match = timeRegex.exec(htmlContent)) !== null) {
						times.push({
							getAttribute: (attr) => (attr === 'datetime' ? match[1] : null),
							textContent: match[2],
						});
					}
					return times;
				}
				if (selector === 'img') {
					const images = [];
					const imgRegex = /<img[^>]*>/g;
					let match;
					while ((match = imgRegex.exec(htmlContent)) !== null) {
						const altMatch = match[0].match(/alt="([^"]*)"/);
						images.push({
							getAttribute: (attr) => (attr === 'alt' ? (altMatch ? altMatch[1] : null) : null),
						});
					}
					return images;
				}
				if (selector.startsWith('h')) {
					const headings = [];
					const level = selector.charAt(1);
					const headingRegex = new RegExp(`<h${level}[^>]*>(.*?)<\/h${level}>`, 'g');
					let match;
					while ((match = headingRegex.exec(htmlContent)) !== null) {
						headings.push({
							tagName: `H${level}`,
							textContent: match[1],
						});
					}
					return headings;
				}
				// Handle semantic elements
				if (['header', 'main', 'section', 'article', 'footer'].includes(selector)) {
					const count = (htmlContent.match(new RegExp(`<${selector}[^>]*>`, 'g')) || []).length;
					return Array(count)
						.fill({})
						.map(() => ({}));
				}
				return [];
			},
			getElementById: (id) => {
				const idRegex = new RegExp(`id="${id}"`);
				return htmlContent.match(idRegex) ? {} : null;
			},
		};
	},

	// Helper to validate CSS content
	validateCSS: (cssContent) => {
		// Basic CSS validation - check for common issues
		const issues = [];

		if (!cssContent || typeof cssContent !== 'string') {
			issues.push('Invalid CSS content');
			return { isValid: false, issues };
		}

		// Check for unclosed braces
		const openBraces = (cssContent.match(/{/g) || []).length;
		const closeBraces = (cssContent.match(/}/g) || []).length;
		if (openBraces !== closeBraces) {
			issues.push('Unmatched braces');
		}

		// Check for basic CSS structure
		if (!cssContent.includes('{') || !cssContent.includes('}')) {
			issues.push('Missing CSS block structure');
		}

		return {
			isValid: issues.length === 0,
			issues,
		};
	},

	// Helper to validate JavaScript content
	validateJS: (jsContent) => {
		try {
			new Function(jsContent);
			return { isValid: true, issues: [] };
		} catch (error) {
			return { isValid: false, issues: [error.message] };
		}
	},
};
